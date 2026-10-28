# Site-specific presentation: fingerprint local styles and initialize a new
# visitor's preference before the upstream theme reads it.
require 'digest'

module PortfolioStyles
  def bust_css_cache(file_name)
    site = @context.registers[:site]
    files = Dir[File.join(site.source, 'assets', '{css,_sass}', '**', '*')].select { |path| File.file?(path) }.sort
    files << File.join(site.source, 'Gemfile.lock')
    fingerprint = Digest::SHA256.hexdigest(files.map { |path| File.binread(path) }.join)[0, 20]
    "#{file_name}?v=#{fingerprint}"
  end
end
Liquid::Template.register_filter(PortfolioStyles)

Jekyll::Hooks.register [:pages, :documents], :post_render do |page|
  next unless page.output_ext == '.html' && page.output.include?('</head>')

  # Keep one identity and decorative quad on Home and inner pages.
  brand = <<~HTML.strip
    <a class="navbar-brand title" href="/">Shakthibala<span class="brand-discipline"> / robotics</span><span class="brand-quad" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none" focusable="false"><path class="brand-quad-arms" d="M12 12L28 28M28 12L12 28"/><g class="brand-quad-rotors"><circle cx="10" cy="10" r="6"/><circle cx="30" cy="10" r="6"/><circle cx="10" cy="30" r="6"/><circle cx="30" cy="30" r="6"/></g><rect class="brand-quad-body" x="16" y="14" width="8" height="12" rx="3"/><path class="brand-quad-heading" d="M20 16L22 20H18Z"/></svg></span></a>
  HTML
  if page.data['permalink'] == '/'
    page.output = page.output.sub(/<div class="navbar-brand social">.*?<\/div>/m, brand)
  end
  page.output = page.output.sub(/<a class="navbar-brand title[^"]*"[^>]*>.*?<\/a>/m, brand)

  site = page.site
  script_path = '/assets/js/portfolio-theme-init.js'
  digest = Digest::SHA256.file(File.join(site.source, script_path.delete_prefix('/'))).hexdigest[0, 20]
  script = %(<script src="#{site.baseurl}#{script_path}?v=#{digest}"></script>)
  page.output = page.output.sub(/<head\b[^>]*>/) { |head| "#{head}\n#{script}" }

  quad_path = '/assets/js/navbar-quad.js'
  quad_digest = Digest::SHA256.file(File.join(site.source, quad_path.delete_prefix('/'))).hexdigest[0, 20]
  quad_script = %(<script src="#{site.baseurl}#{quad_path}?v=#{quad_digest}" defer></script>)
  page.output = page.output.sub('</body>', "#{quad_script}\n</body>")
end
