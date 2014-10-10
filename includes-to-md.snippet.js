var code = document.getElementsByClassName('BM')[0];
var macros = code.getElementsByClassName('stx-macro');
var includes = [], item;

for (var i = 0; i < macros.length; i++) {
  item = macros.item(i);
  if (item.innerText === '#include') includes.push(item);
}

var hash = location.hash.split('&')[0];
var file = hash.replace(/#/, '').replace('chromium/src/third_party/WebKit/Source/', '');

var includeLinks = includes.map(function (include) {
  var a = include.parentElement.getElementsByClassName('PK').item(0);
  var parts = a.href.split('&');
  var pparts = parts[0].split('#');
  var path = pparts[1];
  var name = a.innerText;
  var tocLink = '#' + name.toLowerCase().replace(/[\/.]/g, '');
  return '| [' + name +'](' + tocLink + ') | [*' + path + '*](' + parts[0] + ') |';

})
var result = '#### ' + file + '\n\n' +
             '| Name     |      Path      |\n' +
             '|----------|----------------|\n' +
             includeLinks.join('\n')

result
// copy(result); (in devtools console to copy to clipboard)
