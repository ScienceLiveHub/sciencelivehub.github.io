+++
title = "Tools for verifiable research"
description = "A platform, AI-agent servers, and a replication template that work on the same signed, open record."
template = "page.html"
+++

Science Live is more than a website. Every tool below reads from and writes to the same
open network of signed nanopublications, so whatever you build with one is immediately
usable by the others: by people, by software, and by AI agents.

{{ tools_diagram() }}

## For people

<div class="sl-two-col sl-tools-grid">
<div class="sl-card">
<div class="sl-card-icon"><i class="fas fa-rocket"></i></div>
<h3>Science Live platform</h3>
<p>Create, browse, and cite nanopublications with guided templates: claims, datasets, systematic reviews, and full FORRT replication chains.</p>
<a href="https://platform.sciencelive4all.org" class="sl-btn sl-btn--outline">Open the platform <i class="fas fa-arrow-right"></i></a>
</div>
<div class="sl-card">
<div class="sl-card-icon"><i class="fas fa-book-open"></i></div>
<h3>Replication stories</h3>
<p>Readable stories composed from a replication's evidence chain. Every sentence traces back to a signed claim, method, or result.</p>
<a href="/#stories" class="sl-btn sl-btn--outline">See the stories <i class="fas fa-arrow-right"></i></a>
</div>
<div class="sl-card">
<div class="sl-card-icon"><i class="fas fa-puzzle-piece"></i></div>
<h3>Zotero plugin</h3>
<p>Turn the papers already in your Zotero library into nanopublications without leaving your reference manager.</p>
<a href="https://sciencelive4all.org/science-live-platform/zotero" class="sl-btn sl-btn--outline">Get the plugin <i class="fas fa-arrow-right"></i></a>
</div>
<div class="sl-card">
<div class="sl-card-icon"><i class="fas fa-code"></i></div>
<h3>Embed viewer</h3>
<p>Show any nanopublication on your own website with a single iframe, in your organization's colors.</p>
<a href="https://platform.sciencelive4all.org/embed-demo.html" class="sl-btn sl-btn--outline">See examples <i class="fas fa-arrow-right"></i></a>
</div>
</div>

## For AI agents: MCP servers

The [Model Context Protocol](https://modelcontextprotocol.io) (MCP) lets AI assistants
such as Claude call external tools. Our servers give an assistant access to **verified
evidence instead of guesses**: it can look up whether a finding has been replicated and
with what verdict, then help you produce a new replication that others can check.

Both servers are open source and listed in the
[official MCP Registry](https://registry.modelcontextprotocol.io) under the
`org.sciencelive4all` namespace.

<div class="sl-two-col sl-tools-grid">
<div class="sl-card">
<div class="sl-card-icon"><i class="fas fa-satellite-dish"></i></div>
<h3>Replication Radar</h3>
<p><strong>What is worth replicating, and has it been done?</strong> Searches a research field in the OpenAIRE Graph, ranks high-impact work, and reports whether each result has been independently checked, with what verdict, and whether its software is reusable.</p>
<pre><code>pip install replication-radar</code></pre>
<a href="https://github.com/ScienceLiveHub/replication-radar" class="sl-btn sl-btn--outline">GitHub <i class="fas fa-arrow-right"></i></a>
<a href="https://openaire-hackathon.netlify.app" class="sl-btn sl-btn--outline">Live demo <i class="fas fa-arrow-right"></i></a>
</div>
<div class="sl-card">
<div class="sl-card-icon"><i class="fas fa-link"></i></div>
<h3>FORRT Research MCP</h3>
<p><strong>How do I produce a chain that is correct and verifiable?</strong> Helps a researcher (or their assistant) build a FORRT nanopublication chain for a reproduction, a replication, or new research, and checks it against the templates before anything is published.</p>
<pre><code>pipx install forrt-research-mcp
claude mcp add forrt-research -s user -- forrt-research-mcp</code></pre>
<a href="https://github.com/ScienceLiveHub/forrt-research-mcp" class="sl-btn sl-btn--outline">GitHub <i class="fas fa-arrow-right"></i></a>
</div>
</div>

Together with the [OpenAIRE MCP](https://github.com/ScienceLiveHub/replication-radar/blob/main/docs/openaire-mcp.md),
they cover the whole loop:

| Server | Question it answers |
|---|---|
| OpenAIRE MCP | What is in the literature? |
| Replication Radar | What is worth replicating, and has it been done? |
| FORRT Research MCP | How do I produce a chain that is correct and verifiable? |

## For replicators: the FORRT replication template

A ready-made GitHub repository for running a replication the open way: environment,
CI, Jupyter Book, Docker image, RO-Crate metadata, Software Heritage archiving, a
Zenodo DOI, and the FORRT nanopublication chain that records your verdict.

<div class="sl-center">
<a href="https://github.com/ScienceLiveHub/forrt-replication-template" class="sl-btn sl-btn--primary"><i class="fab fa-github"></i> Use the template</a>
<a href="/contribute/" class="sl-btn sl-btn--outline">Why replicate with us <i class="fas fa-arrow-right"></i></a>
</div>
