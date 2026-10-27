---
layout: page
title: "Versifier: Shakespeare-Style Poem Generation"
description: A prompt-driven poetry CLI with a character-level LSTM and a GPT-2 fine-tuning pipeline, plus sampling and sonnet-style formatting.
img: assets/projects/versifier.svg
importance: 14
category: Natural Language Processing & Generative Models
featured: false
github: https://github.com/Shakthi-Bala/Shakesphere_poem_generator
skills: Python · PyTorch · LSTM · GPT-2 · Hugging Face · Text Generation
highlight: From character prediction to pretrained language-model fine-tuning
media_alt: Versifier architecture showing the LSTM and GPT-2 paths, with an excerpt of the sample recorded in the project report source
media_width: 1200
media_height: 900
portfolio: true
topics: [learning]
---

**Build a language model from scratch, then explore what pretrained language representations bring to creative generation.**

[View code on GitHub](https://github.com/Shakthi-Bala/Shakesphere_poem_generator) ·
[Inspect the generation pipeline](https://github.com/Shakthi-Bala/Shakesphere_poem_generator/blob/main/Code/generate.py)

{% include figure.liquid path="assets/projects/versifier.svg" avoid_scaling=true loading="eager" alt="Architecture illustration of character-level LSTM and fine-tuned GPT-2 generation with four lines from the project's documented GPT-2 sample" width="1200" height="900" class="img-fluid rounded z-depth-1" %}

_Architecture illustration with an excerpt of the GPT-2 sample recorded in `Code/report.py`. This is documented project output, rather than a new inference run._

## The problem

A next-character model can learn Shakespeare-like spellings without reliably producing coherent verse. This project explores that gap through two implementations: a compact recurrent model trained on Shakespeare's plays and a pretrained GPT-2 model fine-tuned on sonnets.

## What I built

- **A character-level baseline.** An embedding layer feeds a two-layer LSTM with 256 hidden units and a linear character-prediction head. The training loop uses next-character cross-entropy, Adam, and gradient clipping.
- **A GPT-2 fine-tuning path.** Cleans sonnet headings and Roman numerals, tokenizes the text into 128-token chunks, and trains with a manual PyTorch loop using AdamW.
- **Prompt-conditioned sampling.** The LSTM maintains recurrent state while sampling characters. The GPT-2 path uses temperature, top-k and nucleus sampling, and a repetition penalty.
- **Sonnet-style formatting.** A vowel-group syllable heuristic organizes output into three quatrains and a couplet, targeting roughly ten syllables per line.
- **A two-engine CLI.** Selects GPT-2 or LSTM, accepts a starting prompt and temperature, and exposes raw output for the LSTM baseline.

## Engineering choices

| Choice                                                    | Purpose                                                          |
| --------------------------------------------------------- | ---------------------------------------------------------------- |
| Implement an LSTM before fine-tuning GPT-2                | Examine sequence modeling at both character and subword levels   |
| Remove numbered headings from the sonnet corpus           | Reduce numbering artifacts in generated verse                    |
| Expose temperature in the CLI                             | Make sampling variability easy to explore                        |
| Keep generation and formatting separate in the GPT-2 path | Distinguish model output from the rules shaping its presentation |

## Run the CLI

After providing the training corpora and preparing the corresponding checkpoint, run from the repository's `Code/` directory:

```bash
python main.py --prompt "Shall I compare thee" --engine gpt2
python main.py --prompt "When winter comes" --engine lstm --temperature 0.8
```

## Evaluation scope

The public checkout contains implementation and report-generation source, but no trained checkpoints, training corpora, or independent evaluation artifacts. The report source records sample output; it does not establish a controlled quality comparison. The syllable heuristic does not enforce stress or rhyme, so fourteen formatted lines do not guarantee a metrically correct Shakespearean sonnet.

[Explore the models, training loops, and CLI →](https://github.com/Shakthi-Bala/Shakesphere_poem_generator)
