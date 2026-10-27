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

  site = page.site
  script_path = '/assets/js/portfolio-theme-init.js'
  digest = Digest::SHA256.file(File.join(site.source, script_path.delete_prefix('/'))).hexdigest[0, 20]
  script = %(<script src="#{site.baseurl}#{script_path}?v=#{digest}"></script>)
  page.output = page.output.sub(/<head\b[^>]*>/) { |head| "#{head}\n#{script}" }
end
