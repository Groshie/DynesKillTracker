# Dyne's KillTracker Plugin
<h2>Table of contents:</h2>
<ol>
  <li>Description</li>
  <li>How to install</li>
  <li>Commands</li>
  <li>How to update/uninstall</li>
  <li>Known bugs</li>
  <li>Screenshots</li>
</ol>
  
<h2>Description:</h2>
<p>It's a plugin for MUSHclient, for use with the Discworld MUD.</p>
<p>Have you ever wondered how many foes you have vanquished?</p>
<p>Have you ever spent long nights crunching those numbers?</p>
<p>Well, put down your pens and papers and look no further!<p>
<p>This plugin will track <strong>your</strong> kills, and will be able to present you with structured information about your deeds!<p>
<p>Written in the abomination that is JScript, then converted to XML.</p>

<h2>How to install:</h2>
<ul>
  <li>Download the .xml-file and place it somewhere you can find it (like: ..\MUSHclient\plugins\)</li>
  <li>Open MUSHclient (5.06)</li>
  <li>Go to File --> Plugins (or hit Shift+Ctrl+P)</li>
  <li>Hit the "Add..." button</li>
  <li>Select the downloaded .xml-file, then hit OK!</li>
  <li>????</li>
  <li>Profit!</li>
</ul>

<h2>Current commands:</h2>
<table>
  <tr><th>Command</th><th>Effect</th><th>Example</th></tr>
  <tr><th>killtrack</th><td>Lists all kills!</td><td>killtracktoggle</td></tr>
  <tr><th>killtracktoggle</th><td>Toggle tracking trigger on/off</td><td>killtracktoggle</td></tr>
  <tr><th>killtrack <creature></th><td>Lookup specific kills</td><td>killtracklookup Cohen</td></tr>
  <tr><th>killtrackshow</th><td>Toggle "on kill" messages off/on</td><td>killtrackshow</td></tr>
  <tr><th>killtrackhelp</th><td>Show a list of available commands</td><td>killtrackhelp</td></tr> 
</table>

<h2>How to update/uninstall:</h2>
<ol>
  <li>Go to MUSHclient, File --> Plugins</li>
  <li>Click on DynesKillTracker, and click the "Remove"-button</li>
  <li>Go to the directory where you installed the plugin from</li>
  <li>Delete the file DynesKillTracker.xml (this is my plugin-file)</li>
  <li>Go to the ..\MUSHclient\worlds\plugins\state\-directory</li>
  <li>Delete the .xml-file that has a serial in it's name that matches: 5acdf51053649069b5a2f9a7</li>
  <li>Now you can follow the directions under "How to install" to re-add the plugin!</li>
</ol>
(Note that removing the state-file will reset all variables too, so don't delete it if you want to just re-install!)

<h2>Known bugs:</h2>
<ul>
  <li>Killing crows in terrains don't give a kill message, it's hard to know if *you* should get the credit!</li>
  <li>Same goes for killing certain brigands in the Ramtops.</li>
  <li>Killing things turned into frogs will add a frog entry. I like it, might keep it!</li>
</ul>

<h2>Screenshots</h2>
<p><em>Message after killing something. Can be turned off by using 'killtracktoggle':</em></p>
<img src="https://github.com/Groshie/DynesKillTracker/blob/main/screenshot_killmsg.png">
<p><em>Example of 'killtrack' output:</em></p>
<img src="https://github.com/Groshie/DynesKillTracker/blob/main/screenshot_killtrack.png">
<p><em>Example of the 'killtracklookup' command:</em></p>
<img src="https://github.com/Groshie/DynesKillTracker/blob/main/screenshot_lookup.png">

<h2>Thank you for remembering those you have bested in mortal combat! <3</h2>
