/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
;(function () {
  var a =
      'undefined' !== typeof window && 'undefined' !== typeof window.document
        ? window.document
        : {},
    d = 'undefined' !== typeof module && module.exports,
    b = 'undefined' !== typeof Element && 'ALLOW_KEYBOARD_INPUT' in Element,
    g = (function () {
      for (
        var e,
          b = [
            'requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror'.split(
              ' '
            ),
            'webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror'.split(
              ' '
            ),
            'webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror'.split(
              ' '
            ),
            'mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror'.split(
              ' '
            ),
            'msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError'.split(
              ' '
            ),
          ],
          f = 0,
          c = b.length,
          r = {};
        f < c;
        f++
      )
        if ((e = b[f]) && e[1] in a) {
          for (f = 0; f < e.length; f++) r[b[0][f]] = e[f]
          return r
        }
      return !1
    })(),
    k = { change: g.fullscreenchange, error: g.fullscreenerror },
    q = {
      request: function (e) {
        var d = g.requestFullscreen
        e = e || a.documentElement
        if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) e[d]()
        else e[d](b && Element.ALLOW_KEYBOARD_INPUT)
      },
      exit: function () {
        a[g.exitFullscreen]()
      },
      toggle: function (a) {
        this.isFullscreen ? this.exit() : this.request(a)
      },
      onchange: function (a) {
        this.on('change', a)
      },
      onerror: function (a) {
        this.on('error', a)
      },
      on: function (e, b) {
        var f = k[e]
        f && a.addEventListener(f, b, !1)
      },
      off: function (e, b) {
        var f = k[e]
        f && a.removeEventListener(f, b, !1)
      },
      raw: g,
    }
  g
    ? (Object.defineProperties(q, {
        isFullscreen: {
          get: function () {
            return !!a[g.fullscreenElement]
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return a[g.fullscreenElement]
          },
        },
        enabled: {
          enumerable: !0,
          get: function () {
            return !!a[g.fullscreenEnabled]
          },
        },
      }),
      d ? (module.exports = q) : (window.screenfull = q))
    : d
    ? (module.exports = !1)
    : (window.screenfull = !1)
})()
;(function () {
  function a(a) {
    a = String(a)
    return a.charAt(0).toUpperCase() + a.slice(1)
  }
  function d(a, c) {
    var e = -1,
      b = a ? a.length : 0
    if ('number' == typeof b && -1 < b && b <= y)
      for (; ++e < b; ) c(a[e], e, a)
    else g(a, c)
  }
  function b(c) {
    c = String(c).replace(/^ +| +$/g, '')
    return /^(?:webOS|i(?:OS|P))/.test(c) ? c : a(c)
  }
  function g(a, c) {
    for (var b in a) z.call(a, b) && c(a[b], b, a)
  }
  function k(c) {
    return null == c ? a(c) : B.call(c).slice(8, -1)
  }
  function q(a, c) {
    var b = null != a ? typeof a[c] : 'number'
    return (
      !/^(?:boolean|number|string|undefined)$/.test(b) &&
      ('object' == b ? !!a[c] : !0)
    )
  }
  function e(a) {
    return String(a).replace(/([ -])(?!$)/g, '$1?')
  }
  function p(a, c) {
    var b = null
    d(a, function (e, f) {
      b = c(b, e, f, a)
    })
    return b
  }
  function f(a) {
    function c(c) {
      return p(c, function (c, m) {
        var h = m.pattern || e(m)
        !c &&
          (c =
            RegExp('\\b' + h + ' *\\d+[.\\w_]*', 'i').exec(a) ||
            RegExp('\\b' + h + ' *\\w+-[\\w]*', 'i').exec(a) ||
            RegExp(
              '\\b' + h + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)',
              'i'
            ).exec(a)) &&
          ((c = String(
            m.label && !RegExp(h, 'i').test(m.label) ? m.label : c
          ).split('/'))[1] &&
            !/[\d.]+/.test(c[0]) &&
            (c[0] += ' ' + c[1]),
          (m = m.label || m),
          (c = b(
            c[0]
              .replace(RegExp(h, 'i'), m)
              .replace(RegExp('; *(?:' + m + '[_-])?', 'i'), ' ')
              .replace(RegExp('(' + m + ')[-_.]?(\\w)', 'i'), '$1 $2')
          )))
        return c
      })
    }
    function d(c) {
      return p(c, function (c, m) {
        return (
          c ||
          (RegExp(
            m + '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)',
            'i'
          ).exec(a) || 0)[1] ||
          null
        )
      })
    }
    var t = r,
      l = a && 'object' == typeof a && 'String' != k(a)
    l && ((t = a), (a = null))
    var x = t.navigator || {},
      m = x.userAgent || ''
    a || (a = m)
    var K = l
        ? !!x.likeChrome
        : /\bChrome\b/.test(a) && !/internal|\n/i.test(B.toString()),
      L = l ? 'Object' : 'ScriptBridgingProxyObject',
      R = l ? 'Object' : 'Environment',
      M = l && t.java ? 'JavaPackage' : k(t.java),
      u = l ? 'Object' : 'RuntimeObject'
    R = (M = /\bJava/.test(M) && t.java) && k(t.environment) == R
    var E = M ? 'a' : '\u03b1',
      A = M ? 'b' : '\u03b2',
      y = t.document || {},
      z = t.operamini || t.opera,
      O = n.test((O = l && z ? z['[[Class]]'] : k(z))) ? O : (z = null),
      h,
      P = a
    l = []
    var Q = null,
      J = a == m
    m = J && z && 'function' == typeof z.version && z.version()
    var C = (function (c) {
        return p(c, function (c, m) {
          return (
            c ||
            (RegExp('\\b' + (m.pattern || e(m)) + '\\b', 'i').exec(a) &&
              (m.label || m))
          )
        })
      })([
        { label: 'EdgeHTML', pattern: 'Edge' },
        'Trident',
        { label: 'WebKit', pattern: 'AppleWebKit' },
        'iCab',
        'Presto',
        'NetFront',
        'Tasman',
        'KHTML',
        'Gecko',
      ]),
      v = (function (c) {
        return p(c, function (c, m) {
          return (
            c ||
            (RegExp('\\b' + (m.pattern || e(m)) + '\\b', 'i').exec(a) &&
              (m.label || m))
          )
        })
      })([
        'Adobe AIR',
        'Arora',
        'Avant Browser',
        'Breach',
        'Camino',
        'Electron',
        'Epiphany',
        'Fennec',
        'Flock',
        'Galeon',
        'GreenBrowser',
        'iCab',
        'Iceweasel',
        'K-Meleon',
        'Konqueror',
        'Lunascape',
        'Maxthon',
        { label: 'Microsoft Edge', pattern: 'Edge' },
        'Midori',
        'Nook Browser',
        'PaleMoon',
        'PhantomJS',
        'Raven',
        'Rekonq',
        'RockMelt',
        { label: 'Samsung Internet', pattern: 'SamsungBrowser' },
        'SeaMonkey',
        { label: 'Silk', pattern: '(?:Cloud9|Silk-Accelerated)' },
        'Sleipnir',
        'SlimBrowser',
        { label: 'SRWare Iron', pattern: 'Iron' },
        'Sunrise',
        'Swiftfox',
        'Waterfox',
        'WebPositive',
        'Opera Mini',
        { label: 'Opera Mini', pattern: 'OPiOS' },
        'Opera',
        { label: 'Opera', pattern: 'OPR' },
        'Chrome',
        { label: 'Chrome Mobile', pattern: '(?:CriOS|CrMo)' },
        { label: 'Firefox', pattern: '(?:Firefox|Minefield)' },
        { label: 'Firefox for iOS', pattern: 'FxiOS' },
        { label: 'IE', pattern: 'IEMobile' },
        { label: 'IE', pattern: 'MSIE' },
        'Safari',
      ]),
      D = c([
        { label: 'BlackBerry', pattern: 'BB10' },
        'BlackBerry',
        { label: 'Galaxy S', pattern: 'GT-I9000' },
        { label: 'Galaxy S2', pattern: 'GT-I9100' },
        { label: 'Galaxy S3', pattern: 'GT-I9300' },
        { label: 'Galaxy S4', pattern: 'GT-I9500' },
        { label: 'Galaxy S5', pattern: 'SM-G900' },
        { label: 'Galaxy S6', pattern: 'SM-G920' },
        { label: 'Galaxy S6 Edge', pattern: 'SM-G925' },
        { label: 'Galaxy S7', pattern: 'SM-G930' },
        { label: 'Galaxy S7 Edge', pattern: 'SM-G935' },
        'Google TV',
        'Lumia',
        'iPad',
        'iPod',
        'iPhone',
        'Kindle',
        { label: 'Kindle Fire', pattern: '(?:Cloud9|Silk-Accelerated)' },
        'Nexus',
        'Nook',
        'PlayBook',
        'PlayStation Vita',
        'PlayStation',
        'TouchPad',
        'Transformer',
        { label: 'Wii U', pattern: 'WiiU' },
        'Wii',
        'Xbox One',
        { label: 'Xbox 360', pattern: 'Xbox' },
        'Xoom',
      ]),
      G = (function (c) {
        return p(c, function (c, m, b) {
          return (
            c ||
            ((m[D] ||
              m[/^[a-z]+(?: +[a-z]+\b)*/i.exec(D)] ||
              RegExp('\\b' + e(b) + '(?:\\b|\\w*\\d)', 'i').exec(a)) &&
              b)
          )
        })
      })({
        Apple: { iPad: 1, iPhone: 1, iPod: 1 },
        Archos: {},
        Amazon: { Kindle: 1, 'Kindle Fire': 1 },
        Asus: { Transformer: 1 },
        'Barnes & Noble': { Nook: 1 },
        BlackBerry: { PlayBook: 1 },
        Google: { 'Google TV': 1, Nexus: 1 },
        HP: { TouchPad: 1 },
        HTC: {},
        LG: {},
        Microsoft: { Xbox: 1, 'Xbox One': 1 },
        Motorola: { Xoom: 1 },
        Nintendo: { 'Wii U': 1, Wii: 1 },
        Nokia: { Lumia: 1 },
        Samsung: {
          'Galaxy S': 1,
          'Galaxy S2': 1,
          'Galaxy S3': 1,
          'Galaxy S4': 1,
        },
        Sony: { PlayStation: 1, 'PlayStation Vita': 1 },
      }),
      w = (function (c) {
        return p(c, function (c, m) {
          var h = m.pattern || e(m)
          if (
            !c &&
            (c = RegExp('\\b' + h + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(a))
          ) {
            var f = c,
              r = m.label || m,
              g = {
                '10.0': '10',
                6.4: '10 Technical Preview',
                6.3: '8.1',
                6.2: '8',
                6.1: 'Server 2008 R2 / 7',
                '6.0': 'Server 2008 / Vista',
                5.2: 'Server 2003 / XP 64-bit',
                5.1: 'XP',
                5.01: '2000 SP1',
                '5.0': '2000',
                '4.0': 'NT',
                '4.90': 'ME',
              }
            h &&
              r &&
              /^Win/i.test(f) &&
              !/^Windows Phone /i.test(f) &&
              (g = g[/[\d.]+$/.exec(f)]) &&
              (f = 'Windows ' + g)
            f = String(f)
            h && r && (f = f.replace(RegExp(h, 'i'), r))
            c = f = b(
              f
                .replace(/ ce$/i, ' CE')
                .replace(/\bhpw/i, 'web')
                .replace(/\bMacintosh\b/, 'Mac OS')
                .replace(/_PowerPC\b/i, ' OS')
                .replace(/\b(OS X) [^ \d]+/i, '$1')
                .replace(/\bMac (OS X)\b/, '$1')
                .replace(/\/(\d)/, ' $1')
                .replace(/_/g, '.')
                .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
                .replace(/\bx86\.64\b/gi, 'x86_64')
                .replace(/\b(Windows Phone) OS\b/, '$1')
                .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
                .split(' on ')[0]
            )
          }
          return c
        })
      })([
        'Windows Phone',
        'Android',
        'CentOS',
        { label: 'Chrome OS', pattern: 'CrOS' },
        'Debian',
        'Fedora',
        'FreeBSD',
        'Gentoo',
        'Haiku',
        'Kubuntu',
        'Linux Mint',
        'OpenBSD',
        'Red Hat',
        'SuSE',
        'Ubuntu',
        'Xubuntu',
        'Cygwin',
        'Symbian OS',
        'hpwOS',
        'webOS ',
        'webOS',
        'Tablet OS',
        'Tizen',
        'Linux',
        'Mac OS X',
        'Macintosh',
        'Mac',
        'Windows 98;',
        'Windows ',
      ])
    C && (C = [C])
    G && !D && (D = c([G]))
    if ((h = /\bGoogle TV\b/.exec(D))) D = h[0]
    ;/\bSimulator\b/i.test(a) && (D = (D ? D + ' ' : '') + 'Simulator')
    'Opera Mini' == v &&
      /\bOPiOS\b/.test(a) &&
      l.push('running in Turbo/Uncompressed mode')
    'IE' == v && /\blike iPhone OS\b/.test(a)
      ? ((h = f(a.replace(/like iPhone OS/, ''))),
        (G = h.manufacturer),
        (D = h.product))
      : /^iP/.test(D)
      ? (v || (v = 'Safari'),
        (w =
          'iOS' +
          ((h = / OS ([\d_]+)/i.exec(a)) ? ' ' + h[1].replace(/_/g, '.') : '')))
      : 'Konqueror' != v || /buntu/i.test(w)
      ? (G &&
          'Google' != G &&
          ((/Chrome/.test(v) && !/\bMobile Safari\b/i.test(a)) ||
            /\bVita\b/.test(D))) ||
        (/\bAndroid\b/.test(w) && /^Chrome/.test(v) && /\bVersion\//i.test(a))
        ? ((v = 'Android Browser'), (w = /\bAndroid\b/.test(w) ? w : 'Android'))
        : 'Silk' == v
        ? (/\bMobi/i.test(a) || ((w = 'Android'), l.unshift('desktop mode')),
          /Accelerated *= *true/i.test(a) && l.unshift('accelerated'))
        : 'PaleMoon' == v && (h = /\bFirefox\/([\d.]+)\b/.exec(a))
        ? l.push('identifying as Firefox ' + h[1])
        : 'Firefox' == v && (h = /\b(Mobile|Tablet|TV)\b/i.exec(a))
        ? (w || (w = 'Firefox OS'), D || (D = h[1]))
        : !v ||
          (h = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(v))
        ? (v &&
            !D &&
            /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(h + '/') + 8)) &&
            (v = null),
          (h = D || G || w) &&
            (D || G || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(w)) &&
            (v =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(w) ? w : h) +
              ' Browser'))
        : 'Electron' == v &&
          (h = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) &&
          l.push('Chromium ' + h)
      : (w = 'Kubuntu')
    m ||
      (m = d([
        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
        'Version',
        e(v),
        '(?:Firefox|Minefield|NetFront)',
      ]))
    if (
      (h =
        ('iCab' == C && 3 < parseFloat(m) && 'WebKit') ||
        (/\bOpera\b/.test(v) && (/\bOPR\b/.test(a) ? 'Blink' : 'Presto')) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(a) &&
          !/^(?:Trident|EdgeHTML)$/.test(C) &&
          'WebKit') ||
        (!C && /\bMSIE\b/i.test(a) && ('Mac OS' == w ? 'Tasman' : 'Trident')) ||
        ('WebKit' == C && /\bPlayStation\b(?! Vita\b)/i.test(v) && 'NetFront'))
    )
      C = [h]
    'IE' == v && (h = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1])
      ? ((v += ' Mobile'),
        (w = 'Windows Phone ' + (/\+$/.test(h) ? h : h + '.x')),
        l.unshift('desktop mode'))
      : /\bWPDesktop\b/i.test(a)
      ? ((v = 'IE Mobile'),
        (w = 'Windows Phone 8.x'),
        l.unshift('desktop mode'),
        m || (m = (/\brv:([\d.]+)/.exec(a) || 0)[1]))
      : 'IE' != v &&
        'Trident' == C &&
        (h = /\brv:([\d.]+)/.exec(a)) &&
        (v && l.push('identifying as ' + v + (m ? ' ' + m : '')),
        (v = 'IE'),
        (m = h[1]))
    if (J) {
      if (q(t, 'global'))
        if (
          (M &&
            ((h = M.lang.System),
            (P = h.getProperty('os.arch')),
            (w =
              w ||
              h.getProperty('os.name') + ' ' + h.getProperty('os.version'))),
          R)
        ) {
          try {
            ;(m = t.require('ringo/engine').version.join('.')), (v = 'RingoJS')
          } catch (T) {
            ;(h = t.system) &&
              h.global.system == t.system &&
              ((v = 'Narwhal'), w || (w = h[0].os || null))
          }
          v || (v = 'Rhino')
        } else
          'object' == typeof t.process &&
            !t.process.browser &&
            (h = t.process) &&
            ('object' == typeof h.versions &&
              ('string' == typeof h.versions.electron
                ? (l.push('Node ' + h.versions.node),
                  (v = 'Electron'),
                  (m = h.versions.electron))
                : 'string' == typeof h.versions.nw &&
                  (l.push('Chromium ' + m, 'Node ' + h.versions.node),
                  (v = 'NW.js'),
                  (m = h.versions.nw))),
            v ||
              ((v = 'Node.js'),
              (P = h.arch),
              (w = h.platform),
              (m = (m = /[\d.]+/.exec(h.version)) ? m[0] : null)))
      else
        k((h = t.runtime)) == L
          ? ((v = 'Adobe AIR'), (w = h.flash.system.Capabilities.os))
          : k((h = t.phantom)) == u
          ? ((v = 'PhantomJS'),
            (m =
              (h = h.version || null) &&
              h.major + '.' + h.minor + '.' + h.patch))
          : 'number' == typeof y.documentMode &&
            (h = /\bTrident\/(\d+)/i.exec(a))
          ? ((m = [m, y.documentMode]),
            (h = +h[1] + 4) != m[1] &&
              (l.push('IE ' + m[1] + ' mode'), C && (C[1] = ''), (m[1] = h)),
            (m = 'IE' == v ? String(m[1].toFixed(1)) : m[0]))
          : 'number' == typeof y.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(v) &&
            (l.push('masking as ' + v + ' ' + m),
            (v = 'IE'),
            (m = '11.0'),
            (C = ['Trident']),
            (w = 'Windows'))
      w = w && b(w)
    }
    m &&
      (h =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(m) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(a + ';' + (J && x.appMinorVersion)) ||
        (/\bMinefield\b/i.test(a) && 'a')) &&
      ((Q = /b/i.test(h) ? 'beta' : 'alpha'),
      (m =
        m.replace(RegExp(h + '\\+?$'), '') +
        ('beta' == Q ? A : E) +
        (/\d+\+?/.exec(h) || '')))
    if (
      'Fennec' == v ||
      ('Firefox' == v && /\b(?:Android|Firefox OS)\b/.test(w))
    )
      v = 'Firefox Mobile'
    else if ('Maxthon' == v && m) m = m.replace(/\.[\d.]+/, '.x')
    else if (/\bXbox\b/i.test(D))
      'Xbox 360' == D && (w = null),
        'Xbox 360' == D && /\bIEMobile\b/.test(a) && l.unshift('mobile mode')
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(v) &&
        (!v || D || /Browser|Mobi/.test(v))) ||
      ('Windows CE' != w && !/Mobi/i.test(a))
    )
      if ('IE' == v && J)
        try {
          null === t.external && l.unshift('platform preview')
        } catch (T) {
          l.unshift('embedded')
        }
      else
        (/\bBlackBerry\b/.test(D) || /\bBB10\b/.test(a)) &&
        (h =
          (RegExp(D.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(a) ||
            0)[1] || m)
          ? ((h = [h, /BB10/.test(a)]),
            (w =
              (h[1] ? ((D = null), (G = 'BlackBerry')) : 'Device Software') +
              ' ' +
              h[0]),
            (m = null))
          : this != g &&
            'Wii' != D &&
            ((J && z) ||
              (/Opera/.test(v) && /\b(?:MSIE|Firefox)\b/i.test(a)) ||
              ('Firefox' == v && /\bOS X (?:\d+\.){2,}/.test(w)) ||
              ('IE' == v &&
                ((w && !/^Win/.test(w) && 5.5 < m) ||
                  (/\bWindows XP\b/.test(w) && 8 < m) ||
                  (8 == m && !/\bTrident\b/.test(a))))) &&
            !n.test((h = f.call(g, a.replace(n, '') + ';'))) &&
            h.name &&
            ((h = 'ing as ' + h.name + ((h = h.version) ? ' ' + h : '')),
            n.test(v)
              ? (/\bIE\b/.test(h) && 'Mac OS' == w && (w = null),
                (h = 'identify' + h))
              : ((h = 'mask' + h),
                (v = O ? b(O.replace(/([a-z])([A-Z])/g, '$1 $2')) : 'Opera'),
                /\bIE\b/.test(h) && (w = null),
                J || (m = null)),
            (C = ['Presto']),
            l.push(h))
    else v += ' Mobile'
    if ((h = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1])) {
      h = [parseFloat(h.replace(/\.(\d)$/, '.0$1')), h]
      if ('Safari' == v && '+' == h[1].slice(-1))
        (v = 'WebKit Nightly'), (Q = 'alpha'), (m = h[1].slice(0, -1))
      else if (
        m == h[1] ||
        m == (h[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1])
      )
        m = null
      h[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1]
      537.36 == h[0] &&
        537.36 == h[2] &&
        28 <= parseFloat(h[1]) &&
        'WebKit' == C &&
        (C = ['Blink'])
      J && (K || h[1])
        ? (C && (C[1] = 'like Chrome'),
          (h =
            h[1] ||
            ((h = h[0]),
            530 > h
              ? 1
              : 532 > h
              ? 2
              : 532.05 > h
              ? 3
              : 533 > h
              ? 4
              : 534.03 > h
              ? 5
              : 534.07 > h
              ? 6
              : 534.1 > h
              ? 7
              : 534.13 > h
              ? 8
              : 534.16 > h
              ? 9
              : 534.24 > h
              ? 10
              : 534.3 > h
              ? 11
              : 535.01 > h
              ? 12
              : 535.02 > h
              ? '13+'
              : 535.07 > h
              ? 15
              : 535.11 > h
              ? 16
              : 535.19 > h
              ? 17
              : 536.05 > h
              ? 18
              : 536.1 > h
              ? 19
              : 537.01 > h
              ? 20
              : 537.11 > h
              ? '21+'
              : 537.13 > h
              ? 23
              : 537.18 > h
              ? 24
              : 537.24 > h
              ? 25
              : 537.36 > h
              ? 26
              : 'Blink' != C
              ? '27'
              : '28')))
        : (C && (C[1] = 'like Safari'),
          (h =
            ((h = h[0]),
            400 > h
              ? 1
              : 500 > h
              ? 2
              : 526 > h
              ? 3
              : 533 > h
              ? 4
              : 534 > h
              ? '4+'
              : 535 > h
              ? 5
              : 537 > h
              ? 6
              : 538 > h
              ? 7
              : 601 > h
              ? 8
              : '8')))
      C &&
        (C[1] +=
          ' ' + (h += 'number' == typeof h ? '.x' : /[.+]/.test(h) ? '' : '+'))
      'Safari' == v && (!m || 45 < parseInt(m)) && (m = h)
    }
    'Opera' == v && (h = /\bzbov|zvav$/.exec(w))
      ? ((v += ' '),
        l.unshift('desktop mode'),
        'zvav' == h ? ((v += 'Mini'), (m = null)) : (v += 'Mobile'),
        (w = w.replace(RegExp(' *' + h + '$'), '')))
      : 'Safari' == v &&
        /\bChrome\b/.exec(C && C[1]) &&
        (l.unshift('desktop mode'),
        (v = 'Chrome Mobile'),
        (m = null),
        /\bOS X\b/.test(w) ? ((G = 'Apple'), (w = 'iOS 4.3+')) : (w = null))
    m &&
      0 == m.indexOf((h = /[\d.]+$/.exec(w))) &&
      -1 < a.indexOf('/' + h + '-') &&
      (w = String(w.replace(h, '')).replace(/^ +| +$/g, ''))
    C &&
      !/\b(?:Avant|Nook)\b/.test(v) &&
      (/Browser|Lunascape|Maxthon/.test(v) ||
        ('Safari' != v && /^iOS/.test(w) && /\bSafari\b/.test(C[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          v
        ) &&
          C[1])) &&
      (h = C[C.length - 1]) &&
      l.push(h)
    l.length && (l = ['(' + l.join('; ') + ')'])
    G && D && 0 > D.indexOf(G) && l.push('on ' + G)
    D && l.push((/^on /.test(l[l.length - 1]) ? '' : 'on ') + D)
    if (w) {
      var S =
        (h = / ([\d.+]+)$/.exec(w)) &&
        '/' == w.charAt(w.length - h[0].length - 1)
      w = {
        architecture: 32,
        family: h && !S ? w.replace(h[0], '') : w,
        version: h ? h[1] : null,
        toString: function () {
          var a = this.version
          return (
            this.family +
            (a && !S ? ' ' + a : '') +
            (64 == this.architecture ? ' 64-bit' : '')
          )
        },
      }
    }
    ;(h = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(P)) && !/\bi686\b/i.test(P)
      ? (w &&
          ((w.architecture = 64),
          (w.family = w.family.replace(RegExp(' *' + h), ''))),
        v &&
          (/\bWOW64\b/i.test(a) ||
            (J &&
              /\w(?:86|32)$/.test(x.cpuClass || x.platform) &&
              !/\bWin64; x64\b/i.test(a))) &&
          l.unshift('32-bit'))
      : w &&
        /^OS X/.test(w.family) &&
        'Chrome' == v &&
        39 <= parseFloat(m) &&
        (w.architecture = 64)
    a || (a = null)
    t = {}
    t.description = a
    t.layout = C && C[0]
    t.manufacturer = G
    t.name = v
    t.prerelease = Q
    t.product = D
    t.ua = a
    t.version = v && m
    t.os = w || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return 'null'
      },
    }
    t.parse = f
    t.toString = function () {
      return this.description || ''
    }
    t.version && l.unshift(m)
    t.name && l.unshift(v)
    w &&
      v &&
      (w != String(w).split(' ')[0] || (w != v.split(' ')[0] && !D)) &&
      l.push(D ? '(' + w + ')' : 'on ' + w)
    l.length && (t.description = l.join(' '))
    return t
  }
  var c = { function: !0, object: !0 },
    r = (c[typeof window] && window) || this,
    x = c[typeof exports] && exports
  c = c[typeof module] && module && !module.nodeType && module
  var l = x && c && 'object' == typeof global && global
  !l || (l.global !== l && l.window !== l && l.self !== l) || (r = l)
  var y = Math.pow(2, 53) - 1,
    n = /\bOpera/
  l = Object.prototype
  var z = l.hasOwnProperty,
    B = l.toString,
    A = f()
  'function' == typeof define && 'object' == typeof define.amd && define.amd
    ? ((r.platform = A),
      define(function () {
        return A
      }))
    : x && c
    ? g(A, function (a, c) {
        x[c] = a
      })
    : (r.platform = A)
}.call(this))
function buildIOSMeta() {
  for (
    var a = [
        {
          name: 'viewport',
          content:
            'width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no',
        },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      ],
      d = 0;
    d < a.length;
    d++
  ) {
    var b = document.createElement('meta')
    b.name = a[d].name
    b.content = a[d].content
    var g = window.document.head.querySelector('meta[name="' + b.name + '"]')
    g && g.parentNode.removeChild(g)
    window.document.head.appendChild(b)
  }
}
function hideIOSFullscreenPanel() {
  jQuery('.xxx-ios-fullscreen-message').css('display', 'none')
  jQuery('.xxx-ios-fullscreen-scroll').css('display', 'none')
  jQuery('.xxx-game-iframe-full').removeClass('xxx-game-iframe-iphone-se')
}
function buildIOSFullscreenPanel() {
  jQuery('body').append(
    '<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>'
  )
}
function showIOSFullscreenPanel() {
  jQuery('.xxx-ios-fullscreen-message').css('display', 'block')
  jQuery('.xxx-ios-fullscreen-scroll').css('display', 'block')
}
function __iosResize() {
  window.scrollTo(0, 0)
  if ('iPhone' === platform.product)
    switch (window.devicePixelRatio) {
      case 2:
        switch (window.innerWidth) {
          case 568:
            320 !== window.innerHeight &&
              jQuery('.xxx-game-iframe-full').addClass(
                'xxx-game-iframe-iphone-se'
              )
            break
          case 667:
            375 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel()
            break
          default:
            hideIOSFullscreenPanel()
        }
        break
      case 3:
        switch (window.innerWidth) {
          case 736:
            414 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel()
            break
          case 724:
            375 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel()
            break
          default:
            hideIOSFullscreenPanel()
        }
        break
      default:
        hideIOSFullscreenPanel()
    }
}
function iosResize() {
  __iosResize()
  setTimeout(function () {
    __iosResize()
  }, 500)
}
function iosInIframe() {
  try {
    return window.self !== window.top
  } catch (a) {
    return !0
  }
}
$(document).ready(function () {
  platform &&
    'iPhone' === platform.product &&
    !iosInIframe() &&
    (buildIOSFullscreenPanel(), buildIOSMeta())
})
jQuery(window).resize(function () {
  platform && 'iPhone' === platform.product && !iosInIframe() && iosResize()
})
var s_iOffsetX,
  s_iOffsetY,
  s_iScaleFactor = 1,
  s_bIsIphone = !1
;(function (a) {
  ;(jQuery.browser = jQuery.browser || {}).mobile =
    /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
})(navigator.userAgent || navigator.vendor || window.opera)
$(window).resize(function () {
  sizeHandler()
})
function trace(a) {
  console.log(a)
}
function isChrome() {
  return (
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  )
}
function isIOS() {
  var a = 'iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod'.split(
    ';'
  )
  for (
    -1 !== navigator.userAgent.toLowerCase().indexOf('iphone') &&
    (s_bIsIphone = !0);
    a.length;

  )
    if (navigator.platform === a.pop()) return !0
  return (s_bIsIphone = !1)
}
function getSize(a) {
  var d = a.toLowerCase(),
    b = window.document,
    g = b.documentElement
  if (void 0 === window['inner' + a]) a = g['client' + a]
  else if (window['inner' + a] != g['client' + a]) {
    var k = b.createElement('body')
    k.id = 'vpw-test-b'
    k.style.cssText = 'overflow:scroll'
    var q = b.createElement('div')
    q.id = 'vpw-test-d'
    q.style.cssText = 'position:absolute;top:-1000px'
    q.innerHTML =
      '<style>@media(' +
      d +
      ':' +
      g['client' + a] +
      'px){body#vpw-test-b div#vpw-test-d{' +
      d +
      ':7px!important}}</style>'
    k.appendChild(q)
    g.insertBefore(k, b.head)
    a = 7 == q['offset' + a] ? g['client' + a] : window['inner' + a]
    g.removeChild(k)
  } else a = window['inner' + a]
  return a
}
window.addEventListener('orientationchange', onOrientationChange)
function onOrientationChange() {
  window.matchMedia('(orientation: portrait)').matches && sizeHandler()
  window.matchMedia('(orientation: landscape)').matches && sizeHandler()
}
function getIOSWindowHeight() {
  return (
    (document.documentElement.clientWidth / window.innerWidth) *
    window.innerHeight
  )
}
function getHeightOfIOSToolbars() {
  var a =
    (0 === window.orientation ? screen.height : screen.width) -
    getIOSWindowHeight()
  return 1 < a ? a : 0
}
function sizeHandler() {
  window.scrollTo(0, 1)
  if ($('#canvas')) {
    var a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
      ? getIOSWindowHeight()
      : getSize('Height')
    var d = getSize('Width')
    _checkOrientation(d, a)
    var b = Math.min(a / CANVAS_HEIGHT, d / CANVAS_WIDTH),
      g = CANVAS_WIDTH * b
    b *= CANVAS_HEIGHT
    if (b < a) {
      var k = a - b
      b += k
      g += (CANVAS_WIDTH / CANVAS_HEIGHT) * k
    } else
      g < d &&
        ((k = d - g), (g += k), (b += (CANVAS_HEIGHT / CANVAS_WIDTH) * k))
    k = a / 2 - b / 2
    var q = d / 2 - g / 2,
      e = CANVAS_WIDTH / g
    if (q * e < -EDGEBOARD_X || k * e < -EDGEBOARD_Y)
      (b = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        d / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (g = CANVAS_WIDTH * b),
        (b *= CANVAS_HEIGHT),
        (k = (a - b) / 2),
        (q = (d - g) / 2),
        (e = CANVAS_WIDTH / g)
    s_iOffsetX = -1 * q * e
    s_iOffsetY = -1 * k * e
    0 <= k && (s_iOffsetY = 0)
    0 <= q && (s_iOffsetX = 0)
    null !== s_oInterface &&
      s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    s_bIsIphone
      ? ((canvas = document.getElementById('canvas')),
        (s_oStage.canvas.width = 2 * g),
        (s_oStage.canvas.height = 2 * b),
        (canvas.style.width = g + 'px'),
        (canvas.style.height = b + 'px'),
        (a = Math.min(g / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
        (s_iScaleFactor = 2 * a),
        (s_oStage.scaleX = s_oStage.scaleY = 2 * a))
      : s_bMobile || isChrome()
      ? ($('#canvas').css('width', g + 'px'),
        $('#canvas').css('height', b + 'px'))
      : ((s_oStage.canvas.width = g),
        (s_oStage.canvas.height = b),
        (s_iScaleFactor = Math.min(g / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor))
    0 > k ? $('#canvas').css('top', k + 'px') : $('#canvas').css('top', '0px')
    $('#canvas').css('left', q + 'px')
    fullscreenHandler()
  }
}
function _checkOrientation(a, d) {
  s_bMobile &&
    ENABLE_CHECK_ORIENTATION &&
    (a > d
      ? 'landscape' === $('.orientation-msg-container').attr('data-orientation')
        ? ($('.orientation-msg-container').css('display', 'none'),
          s_oMain.startUpdate())
        : ($('.orientation-msg-container').css('display', 'block'),
          s_oMain.stopUpdate())
      : 'portrait' === $('.orientation-msg-container').attr('data-orientation')
      ? ($('.orientation-msg-container').css('display', 'none'),
        s_oMain.startUpdate())
      : ($('.orientation-msg-container').css('display', 'block'),
        s_oMain.stopUpdate()))
}
function createBitmap(a, d, b) {
  var g = new createjs.Bitmap(a),
    k = new createjs.Shape()
  d && b
    ? k.graphics.beginFill('#fff').drawRect(0, 0, d, b)
    : k.graphics.beginFill('#ff0').drawRect(0, 0, a.width, a.height)
  g.hitArea = k
  return g
}
function createSprite(a, d, b, g, k, q) {
  a = null !== d ? new createjs.Sprite(a, d) : new createjs.Sprite(a)
  d = new createjs.Shape()
  d.graphics.beginFill('#000000').drawRect(-b, -g, k, q)
  a.hitArea = d
  return a
}
function randomFloatBetween(a, d, b) {
  'undefined' === typeof b && (b = 2)
  return parseFloat(Math.min(a + Math.random() * (d - a), d).toFixed(b))
}
function shuffle(a) {
  for (var d = a.length, b, g; 0 !== d; )
    (g = Math.floor(Math.random() * d)),
      --d,
      (b = a[d]),
      (a[d] = a[g]),
      (a[g] = b)
  return a
}
function formatTime(a) {
  a /= 1e3
  var d = Math.floor(a / 60)
  a = parseFloat(a - 60 * d).toFixed(1)
  var b = ''
  b = 10 > d ? b + ('0' + d + ':') : b + (d + ':')
  return 10 > a ? b + ('0' + a) : b + a
}
function NoClickDelay(a) {
  this.element = a
  window.Touch && this.element.addEventListener('touchstart', this, !1)
}
NoClickDelay.prototype = {
  handleEvent: function (a) {
    switch (a.type) {
      case 'touchstart':
        this.onTouchStart(a)
        break
      case 'touchmove':
        this.onTouchMove(a)
        break
      case 'touchend':
        this.onTouchEnd(a)
    }
  },
  onTouchStart: function (a) {
    a.preventDefault()
    this.moved = !1
    this.element.addEventListener('touchmove', this, !1)
    this.element.addEventListener('touchend', this, !1)
  },
  onTouchMove: function (a) {
    this.moved = !0
  },
  onTouchEnd: function (a) {
    this.element.removeEventListener('touchmove', this, !1)
    this.element.removeEventListener('touchend', this, !1)
    if (!this.moved) {
      a = document.elementFromPoint(
        a.changedTouches[0].clientX,
        a.changedTouches[0].clientY
      )
      3 === a.nodeType && (a = a.parentNode)
      var d = document.createEvent('MouseEvents')
      d.initEvent('click', !0, !0)
      a.dispatchEvent(d)
    }
  },
}
function playSound(a, d, b) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(d),
      s_aSounds[a].loop(b),
      s_aSounds[a])
    : null
}
function stopSound(a) {
  ;(!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop()
}
function setVolume(a, d) {
  ;(!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(d)
}
function setMute(a, d) {
  ;(!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(d)
}
function ctlArcadeResume() {
  null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
  null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
  for (
    var d = window.location.search.substring(1).split('&'), b = 0;
    b < d.length;
    b++
  ) {
    var g = d[b].split('=')
    if (g[0] == a) return g[1]
  }
}
;(function () {
  function a(a) {
    var b = {
      focus: 'visible',
      focusin: 'visible',
      pageshow: 'visible',
      blur: 'hidden',
      focusout: 'hidden',
      pagehide: 'hidden',
    }
    a = a || window.event
    a.type in b
      ? (document.body.className = b[a.type])
      : ((document.body.className = this[d] ? 'hidden' : 'visible'),
        'hidden' === document.body.className
          ? s_oMain.stopUpdate()
          : s_oMain.startUpdate())
  }
  var d = 'hidden'
  d in document
    ? document.addEventListener('visibilitychange', a)
    : (d = 'mozHidden') in document
    ? document.addEventListener('mozvisibilitychange', a)
    : (d = 'webkitHidden') in document
    ? document.addEventListener('webkitvisibilitychange', a)
    : (d = 'msHidden') in document
    ? document.addEventListener('msvisibilitychange', a)
    : 'onfocusin' in document
    ? (document.onfocusin = document.onfocusout = a)
    : (window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a)
})()
function fullscreenHandler() {
  ENABLE_FULLSCREEN &&
    screenfull.enabled &&
    ((s_bFullscreen =
      screen.height < window.innerHeight + 3 &&
      screen.height > window.innerHeight - 3
        ? !0
        : !1),
    null !== s_oInterface && s_oInterface.resetFullscreenBut(),
    null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.enabled)
  screenfull.on('change', function () {
    s_bFullscreen = screenfull.isFullscreen
    null !== s_oInterface && s_oInterface.resetFullscreenBut()
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
  })
function CSpriteLibrary() {
  var a, d, b, g, k, q
  this.init = function (e, p, f) {
    b = d = 0
    g = e
    k = p
    q = f
    a = {}
  }
  this.addSprite = function (b, g) {
    a.hasOwnProperty(b) || ((a[b] = { szPath: g, oSprite: new Image() }), d++)
  }
  this.getSprite = function (b) {
    return a.hasOwnProperty(b) ? a[b].oSprite : null
  }
  this._onSpritesLoaded = function () {
    k.call(q)
  }
  this._onSpriteLoaded = function () {
    g.call(q)
    ++b === d && this._onSpritesLoaded()
  }
  this.loadSprites = function () {
    for (var b in a)
      (a[b].oSprite.oSpriteLibrary = this),
        (a[b].oSprite.onload = function () {
          this.oSpriteLibrary._onSpriteLoaded()
        }),
        (a[b].oSprite.src = a[b].szPath)
  }
  this.getNumSprites = function () {
    return d
  }
}
var CANVAS_WIDTH = 1500,
  CANVAS_HEIGHT = 640,
  EDGEBOARD_X = 300,
  EDGEBOARD_Y = 0,
  FPS_TIME = 1e3 / 24,
  DISABLE_SOUND_MOBILE = !1,
  FONT_GAME = 'arialbold',
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 1,
  STATE_GAME = 3,
  GAME_STATE_IDLE = 0,
  GAME_STATE_SPINNING = 1,
  GAME_STATE_SHOW_ALL_WIN = 2,
  GAME_STATE_SHOW_WIN = 3,
  REEL_STATE_START = 0,
  REEL_STATE_MOVING = 1,
  REEL_STATE_STOP = 2,
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_DRAG_START = 4,
  ON_DRAG_END = 5,
  REEL_OFFSET_X = 380,
  REEL_OFFSET_Y = 84,
  NUM_REELS = 5,
  NUM_ROWS = 3,
  NUM_SYMBOLS = 8,
  WILD_SYMBOL = 8,
  NUM_PAYLINES = 20,
  SYMBOL_SIZE = 140,
  SPACE_BETWEEN_SYMBOLS = 10,
  MAX_FRAMES_REEL_EASE = 16,
  MIN_REEL_LOOPS,
  REEL_DELAY,
  REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE,
  REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE,
  TIME_SHOW_WIN,
  TIME_SHOW_ALL_WINS,
  MIN_BET = 0.05,
  MAX_BET = 0.5,
  TOTAL_MONEY,
  WIN_OCCURRENCE,
  SLOT_CASH,
  MIN_WIN,
  PAYTABLE_VALUES,
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SHOW_CREDITS
function CSlotSettings() {
  this._init = function () {
    this._initSymbolSpriteSheets()
    this._initPaylines()
    this._initSymbolWin()
    this._initSymbolAnims()
    this._initSymbolsOccurence()
  }
  this._initSymbolSpriteSheets = function () {
    s_aSymbolData = []
    for (var a = 1; a < NUM_SYMBOLS + 1; a++) {
      var d = {
        images: [s_oSpriteLibrary.getSprite('symbol_' + a)],
        frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
        animations: { static: [0, 1], moving: [1, 2] },
      }
      s_aSymbolData[a] = new createjs.SpriteSheet(d)
    }
  }
  this._initPaylines = function () {
    s_aPaylineCombo = [
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 0, col: 4 },
      ],
      [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 2, col: 4 },
      ],
      [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
        { row: 1, col: 3 },
        { row: 0, col: 4 },
      ],
      [
        { row: 2, col: 0 },
        { row: 1, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 3 },
        { row: 2, col: 4 },
      ],
      [
        { row: 1, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 4 },
      ],
      [
        { row: 1, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 1, col: 4 },
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 3 },
        { row: 2, col: 4 },
      ],
      [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 1, col: 2 },
        { row: 0, col: 3 },
        { row: 0, col: 4 },
      ],
      [
        { row: 1, col: 0 },
        { row: 2, col: 1 },
        { row: 1, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 4 },
      ],
      [
        { row: 2, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 3 },
        { row: 1, col: 4 },
      ],
      [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 0, col: 4 },
      ],
      [
        { row: 2, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 2, col: 4 },
      ],
      [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 3 },
        { row: 0, col: 4 },
      ],
      [
        { row: 2, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
        { row: 1, col: 3 },
        { row: 2, col: 4 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
      ],
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 2, col: 2 },
        { row: 0, col: 3 },
        { row: 0, col: 4 },
      ],
      [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 0, col: 2 },
        { row: 2, col: 3 },
        { row: 2, col: 4 },
      ],
      [
        { row: 0, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 0, col: 4 },
      ],
    ]
  }
  this._initSymbolWin = function () {
    s_aSymbolWin = []
    s_aSymbolWin[0] = PAYTABLE_VALUES[0]
    s_aSymbolWin[1] = PAYTABLE_VALUES[1]
    s_aSymbolWin[2] = PAYTABLE_VALUES[2]
    s_aSymbolWin[3] = PAYTABLE_VALUES[3]
    s_aSymbolWin[4] = PAYTABLE_VALUES[4]
    s_aSymbolWin[5] = PAYTABLE_VALUES[5]
    s_aSymbolWin[6] = PAYTABLE_VALUES[6]
  }
  this._initSymbolAnims = function () {
    s_aSymbolAnims = []
    var a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite('symbol_1_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 14] },
    }
    s_aSymbolAnims[0] = new createjs.SpriteSheet(a)
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite('symbol_2_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 14] },
    }
    s_aSymbolAnims[1] = new createjs.SpriteSheet(a)
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite('symbol_3_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 14] },
    }
    s_aSymbolAnims[2] = new createjs.SpriteSheet(a)
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite('symbol_4_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 14] },
    }
    s_aSymbolAnims[3] = new createjs.SpriteSheet(a)
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite('symbol_5_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 14] },
    }
    s_aSymbolAnims[4] = new createjs.SpriteSheet(a)
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite('symbol_6_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 14] },
    }
    s_aSymbolAnims[5] = new createjs.SpriteSheet(a)
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite('symbol_7_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 14] },
    }
    s_aSymbolAnims[6] = new createjs.SpriteSheet(a)
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite('symbol_8_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 14] },
    }
    s_aSymbolAnims[7] = new createjs.SpriteSheet(a)
  }
  this._initSymbolsOccurence = function () {
    s_aRandSymbols = []
    var a
    for (a = 0; 1 > a; a++) s_aRandSymbols.push(1)
    for (a = 0; 2 > a; a++) s_aRandSymbols.push(2)
    for (a = 0; 3 > a; a++) s_aRandSymbols.push(3)
    for (a = 0; 4 > a; a++) s_aRandSymbols.push(4)
    for (a = 0; 4 > a; a++) s_aRandSymbols.push(5)
    for (a = 0; 6 > a; a++) s_aRandSymbols.push(6)
    for (a = 0; 6 > a; a++) s_aRandSymbols.push(7)
    for (a = 0; 1 > a; a++) s_aRandSymbols.push(8)
  }
  this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols
TEXT_MONEY = 'MONEY'
TEXT_PLAY = 'PLAY'
TEXT_BET = 'BET'
TEXT_COIN = 'COIN'
TEXT_MAX_BET = 'MAX BET'
TEXT_INFO = 'INFO'
TEXT_LINES = 'LINES'
TEXT_SPIN = 'SPIN'
TEXT_WIN = 'WIN'
TEXT_HELP_WILD =
  'THIS SIMBOL IS A JOLLY WHICH CAN REPLACE ANY OTHER SYMBOL TO MAKE UP A COMBO'
TEXT_CREDITS_DEVELOPED = 'DEVELOPED BY'
TEXT_CURRENCY = '$'
TEXT_PRELOADER_CONTINUE = 'START'
TEXT_SHARE_IMAGE = '200x200.jpg'
TEXT_SHARE_TITLE = 'Congratulations!'
TEXT_SHARE_MSG1 = 'You collected <strong>'
TEXT_SHARE_MSG2 = ' points</strong>!<br><br>Share your score with your friends!'
TEXT_SHARE_SHARE1 = 'My score is '
TEXT_SHARE_SHARE2 = ' points! Can you do better?'
function CPreloader() {
  var a, d, b, g, k, q, e, p, f, c
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this)
    s_oSpriteLibrary.addSprite(
      'progress_bar',
      '../slots/sprites/progress_bar.png'
    )
    s_oSpriteLibrary.addSprite('200x200', '../slots/sprites/200x200.jpg')
    s_oSpriteLibrary.addSprite('but_start', '../slots/sprites/but_start.png')
    s_oSpriteLibrary.loadSprites()
    c = new createjs.Container()
    s_oStage.addChild(c)
  }
  this.unload = function () {
    c.removeAllChildren()
    f.unload()
  }
  this._onImagesLoaded = function () {}
  this._onAllImagesLoaded = function () {
    this.attachSprites()
    s_oMain.preloaderReady()
  }
  this.attachSprites = function () {
    var r = new createjs.Shape()
    r.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    c.addChild(r)
    r = s_oSpriteLibrary.getSprite('200x200')
    e = createBitmap(r)
    e.regX = 0.5 * r.width
    e.regY = 0.5 * r.height
    e.x = CANVAS_WIDTH / 2
    e.y = CANVAS_HEIGHT / 2 - 180
    c.addChild(e)
    p = new createjs.Shape()
    p.graphics
      .beginFill('rgba(0,0,0,0.01)')
      .drawRoundRect(e.x - 100, e.y - 100, 200, 200, 10)
    c.addChild(p)
    e.mask = p
    r = s_oSpriteLibrary.getSprite('progress_bar')
    g = createBitmap(r)
    g.x = CANVAS_WIDTH / 2 - r.width / 2
    g.y = CANVAS_HEIGHT / 2 + 50
    c.addChild(g)
    a = r.width
    d = r.height
    k = new createjs.Shape()
    k.graphics.beginFill('rgba(0,0,0,0.01)').drawRect(g.x, g.y, 1, d)
    c.addChild(k)
    g.mask = k
    b = new createjs.Text('', '30px ' + FONT_GAME, '#fff')
    b.x = CANVAS_WIDTH / 2
    b.y = CANVAS_HEIGHT / 2 + 100
    b.textBaseline = 'alphabetic'
    b.textAlign = 'center'
    c.addChild(b)
    r = s_oSpriteLibrary.getSprite('but_start')
    f = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2,
      r,
      TEXT_PRELOADER_CONTINUE,
      'Arial',
      '#000',
      'bold 40',
      c
    )
    f.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this)
    f.setVisible(!1)
    q = new createjs.Shape()
    q.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    c.addChild(q)
    createjs.Tween.get(q)
      .to({ alpha: 0 }, 500)
      .call(function () {
        createjs.Tween.removeTweens(q)
        c.removeChild(q)
      })
  }
  this._onButStartRelease = function () {
    $(s_oMain).trigger('show_preroll_ad')
    s_oMain._onRemovePreloader()
  }
  this.refreshLoader = function (c) {
    b.text = c + '%'
    100 === c && (f.setVisible(!0), (b.visible = !1), (g.visible = !1))
    k.graphics.clear()
    c = Math.floor((c * a) / 100)
    k.graphics.beginFill('rgba(0,0,0,0.01)').drawRect(g.x, g.y, c, d)
  }
  this._init()
}
function CMain(a) {
  var d,
    b = 0,
    g = 0,
    k = STATE_LOADING,
    q,
    e
  this.initContainer = function () {
    var a = document.getElementById('canvas')
    s_oStage = new createjs.Stage(a)
    createjs.Touch.enable(s_oStage)
    s_bMobile = jQuery.browser.mobile
    !1 === s_bMobile && s_oStage.enableMouseOver(20)
    s_iPrevTime = new Date().getTime()
    createjs.Ticker.framerate = 30
    createjs.Ticker.addEventListener('tick', this._update)
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0)
    s_oSpriteLibrary = new CSpriteLibrary()
    q = new CPreloader()
  }
  this.preloaderReady = function () {
    ;(!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds()
    this._loadImages()
    d = !0
  }
  this.soundLoaded = function () {
    b++
    q.refreshLoader(Math.floor((b / g) * 100))
    b === g && new CSlotSettings()
  }
  this._initSounds = function () {
    var a = []
    a.push({
      path: '../slots/sounds/',
      filename: 'press_but',
      loop: !1,
      volume: 1,
      ingamename: 'press_but',
    })
    a.push({
      path: '../slots/sounds/',
      filename: 'win',
      loop: !1,
      volume: 1,
      ingamename: 'win',
    })
    a.push({
      path: '../slots/sounds/',
      filename: 'reels',
      loop: !1,
      volume: 1,
      ingamename: 'reels',
    })
    a.push({
      path: '../slots/sounds/',
      filename: 'reel_stop',
      loop: !1,
      volume: 1,
      ingamename: 'reel_stop',
    })
    a.push({
      path: '../slots/sounds/',
      filename: 'start_reel',
      loop: !1,
      volume: 1,
      ingamename: 'start_reel',
    })
    g += a.length
    s_aSounds = []
    for (var b = 0; b < a.length; b++)
      s_aSounds[a[b].ingamename] = new Howl({
        src: [a[b].path + a[b].filename + '.mp3'],
        autoplay: !1,
        preload: !0,
        loop: a[b].loop,
        volume: a[b].volume,
        onload: s_oMain.soundLoaded,
      })
  }
  this._loadImages = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this)
    s_oSpriteLibrary.addSprite('but_bg', '../slots/sprites/but_play_bg.png')
    s_oSpriteLibrary.addSprite('but_exit', '../slots/sprites/but_exit.png')
    s_oSpriteLibrary.addSprite('bg_menu', '../slots/sprites/bg_menu.jpg')
    s_oSpriteLibrary.addSprite('bg_game', '../slots/sprites/bg_game.jpg')
    s_oSpriteLibrary.addSprite('paytable', '../slots/sprites/paytable.jpg')
    s_oSpriteLibrary.addSprite('mask_slot', '../slots/sprites/mask_slot.png')
    s_oSpriteLibrary.addSprite('spin_but', '../slots/sprites/but_spin_bg.png')
    s_oSpriteLibrary.addSprite('coin_but', '../slots/sprites/but_coin_bg.png')
    s_oSpriteLibrary.addSprite('info_but', '../slots/sprites/but_info_bg.png')
    s_oSpriteLibrary.addSprite('bet_but', '../slots/sprites/bet_but.png')
    s_oSpriteLibrary.addSprite(
      'win_frame_anim',
      '../slots/sprites/win_frame_anim.png'
    )
    s_oSpriteLibrary.addSprite(
      'but_lines_bg',
      '../slots/sprites/but_lines_bg.png'
    )
    s_oSpriteLibrary.addSprite(
      'but_maxbet_bg',
      '../slots/sprites/but_maxbet_bg.png'
    )
    s_oSpriteLibrary.addSprite('audio_icon', '../slots/sprites/audio_icon.png')
    s_oSpriteLibrary.addSprite('msg_box', '../slots/sprites/msg_box.png')
    s_oSpriteLibrary.addSprite('logo_ctl', '../slots/sprites/logo_ctl.png')
    s_oSpriteLibrary.addSprite(
      'but_fullscreen',
      '../slots/sprites/but_fullscreen.png'
    )
    s_oSpriteLibrary.addSprite(
      'but_credits',
      '../slots/sprites/but_credits.png'
    )
    for (var a = 1; a < NUM_SYMBOLS + 1; a++)
      s_oSpriteLibrary.addSprite(
        'symbol_' + a,
        '../slots/sprites/symbol_' + a + '.png'
      ),
        s_oSpriteLibrary.addSprite(
          'symbol_' + a + '_anim',
          '../slots/sprites/symbol_' + a + '_anim.png'
        )
    for (a = 1; a < NUM_PAYLINES + 1; a++)
      s_oSpriteLibrary.addSprite(
        'payline_' + a,
        '../slots/sprites/payline_' + a + '.png'
      )
    g += s_oSpriteLibrary.getNumSprites()
    s_oSpriteLibrary.loadSprites()
  }
  this._onImagesLoaded = function () {
    b++
    q.refreshLoader(Math.floor((b / g) * 100))
    b === g && new CSlotSettings()
  }
  this._onAllImagesLoaded = function () {}
  this._onRemovePreloader = function () {
    q.unload()
    this.gotoMenu()
  }
  this.gotoMenu = function () {
    new CMenu()
    k = STATE_MENU
  }
  this.gotoGame = function () {
    e = new CGame(p)
    k = STATE_GAME
  }
  this.gotoHelp = function () {
    new CHelp()
    k = STATE_HELP
  }
  this.stopUpdate = function () {
    d = !1
    createjs.Ticker.paused = !0
    $('#block_game').css('display', 'block')
    ;(!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0)
  }
  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime()
    d = !0
    createjs.Ticker.paused = !1
    $('#block_game').css('display', 'none')
    ;(!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
      s_bAudioActive &&
      Howler.mute(!1)
  }
  this._update = function (a) {
    if (!1 !== d) {
      var c = new Date().getTime()
      s_iTimeElaps = c - s_iPrevTime
      s_iCntTime += s_iTimeElaps
      s_iCntFps++
      s_iPrevTime = c
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0))
      k === STATE_GAME && e.update()
      s_oStage.update(a)
    }
  }
  s_oMain = this
  var p = a
  PAYTABLE_VALUES = []
  for (var f = 0; 7 > f; f++)
    PAYTABLE_VALUES[f] = a['paytable_symbol_' + (f + 1)]
  ENABLE_FULLSCREEN = p.fullscreen
  ENABLE_CHECK_ORIENTATION = p.check_orientation
  SHOW_CREDITS = p.show_credits
  this.initContainer()
}
var s_bMobile,
  s_bAudioActive = !0,
  s_bFullscreen = !1,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_oDrawLayer,
  s_oStage,
  s_oMain,
  s_oSpriteLibrary
function CTextButton(a, d, b, g, k, q, e, p) {
  var f, c, r, x, l, y, n, z
  this._init = function (a, b, e, g, d, l, k) {
    f = !1
    c = []
    r = []
    x = []
    var m = createBitmap(e)
    z = new createjs.Text(g, k + 'px ' + d, l)
    z.textAlign = 'center'
    z.textBaseline = 'middle'
    z.x = e.width / 2
    z.y = Math.floor(e.height / 2)
    n = new createjs.Container()
    n.x = a
    n.y = b
    n.regX = e.width / 2
    n.regY = e.height / 2
    n.addChild(m, z)
    B.addChild(n)
    s_bMobile || (n.cursor = 'pointer')
    this._initListener()
  }
  this.unload = function () {
    n.off('mousedown', l)
    n.off('click', y)
    B.removeChild(n)
  }
  this.setVisible = function (a) {
    n.visible = a
  }
  this._initListener = function () {
    l = n.on('mousedown', this.buttonDown)
    y = n.on('click', this.buttonRelease)
  }
  this.addEventListener = function (a, c, b) {
    r[a] = c
    x[a] = b
  }
  this.enable = function () {
    f = !1
  }
  this.disable = function () {
    f = !0
  }
  this.buttonRelease = function () {
    f ||
      ((n.scaleX = 1),
      (n.scaleY = 1),
      playSound('press_but', 1, !1),
      r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(x[ON_MOUSE_UP], c[ON_MOUSE_UP]))
  }
  this.buttonDown = function () {
    f ||
      ((n.scaleX = 0.9),
      (n.scaleY = 0.9),
      r[ON_MOUSE_DOWN] &&
        r[ON_MOUSE_DOWN].call(x[ON_MOUSE_DOWN], c[ON_MOUSE_DOWN]))
  }
  this.addEventListenerWithParams = function (a, b, f, e) {
    r[a] = b
    x[a] = f
    c[a] = e
  }
  this.setTextPosition = function (a) {
    z.y = a
  }
  this.setPosition = function (a, c) {
    n.x = a
    n.y = c
  }
  this.setX = function (a) {
    n.x = a
  }
  this.setY = function (a) {
    n.y = a
  }
  this.getButtonImage = function () {
    return n
  }
  this.getX = function () {
    return n.x
  }
  this.getY = function () {
    return n.y
  }
  var B = p
  this._init(a, d, b, g, k, q, e)
  return this
}
function CGfxButton(a, d, b) {
  var g,
    k,
    q,
    e,
    p = [],
    f
  this._init = function (a, b, g) {
    q = []
    e = []
    f = createBitmap(g)
    f.x = a
    f.y = b
    f.regX = g.width / 2
    f.regY = g.height / 2
    s_bMobile || (f.cursor = 'pointer')
    s_oStage.addChild(f)
    this._initListener()
  }
  this.unload = function () {
    f.off('mousedown', g)
    f.off('pressup', k)
    s_oStage.removeChild(f)
  }
  this.setVisible = function (a) {
    f.visible = a
  }
  this._initListener = function () {
    g = f.on('mousedown', this.buttonDown)
    k = f.on('pressup', this.buttonRelease)
  }
  this.addEventListener = function (a, b, f) {
    q[a] = b
    e[a] = f
  }
  this.addEventListenerWithParams = function (a, b, f, g) {
    q[a] = b
    e[a] = f
    p = g
  }
  this.buttonRelease = function () {
    playSound('press_but', 0.3, !1)
    f.scaleX = 1
    f.scaleY = 1
    q[ON_MOUSE_UP] && q[ON_MOUSE_UP].call(e[ON_MOUSE_UP], p)
  }
  this.buttonDown = function () {
    f.scaleX = 0.9
    f.scaleY = 0.9
    q[ON_MOUSE_DOWN] && q[ON_MOUSE_DOWN].call(e[ON_MOUSE_DOWN], p)
  }
  this.setPosition = function (a, b) {
    f.x = a
    f.y = b
  }
  this.setX = function (a) {
    f.x = a
  }
  this.setY = function (a) {
    f.y = a
  }
  this.getButtonImage = function () {
    return f
  }
  this.getX = function () {
    return f.x
  }
  this.getY = function () {
    return f.y
  }
  this._init(a, d, b)
  return this
}
function CToggle(a, d, b, g, k) {
  var q, e, p, f, c, r, x
  this._init = function (a, c, b, g, d) {
    x = void 0 !== d ? d : s_oStage
    e = []
    p = []
    d = new createjs.SpriteSheet({
      images: [b],
      frames: {
        width: b.width / 2,
        height: b.height,
        regX: b.width / 2 / 2,
        regY: b.height / 2,
      },
      animations: { state_true: [0], state_false: [1] },
    })
    q = g
    f = createSprite(
      d,
      'state_' + q,
      b.width / 2 / 2,
      b.height / 2,
      b.width / 2,
      b.height
    )
    f.x = a
    f.y = c
    f.stop()
    s_bMobile || (f.cursor = 'pointer')
    x.addChild(f)
    this._initListener()
  }
  this.unload = function () {
    f.off('mousedown', c)
    f.off('pressup', r)
    x.removeChild(f)
  }
  this._initListener = function () {
    c = f.on('mousedown', this.buttonDown)
    r = f.on('pressup', this.buttonRelease)
  }
  this.addEventListener = function (a, c, b) {
    e[a] = c
    p[a] = b
  }
  this.setCursorType = function (a) {
    f.cursor = a
  }
  this.setActive = function (a) {
    q = a
    f.gotoAndStop('state_' + q)
  }
  this.buttonRelease = function () {
    f.scaleX = 1
    f.scaleY = 1
    playSound('press_but', 1, !1)
    q = !q
    f.gotoAndStop('state_' + q)
    e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(p[ON_MOUSE_UP], q)
  }
  this.buttonDown = function () {
    f.scaleX = 0.9
    f.scaleY = 0.9
    e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(p[ON_MOUSE_DOWN])
  }
  this.setPosition = function (a, c) {
    f.x = a
    f.y = c
  }
  this._init(a, d, b, g, k)
}
function CBetBut(a, d, b) {
  var g,
    k,
    q,
    e = [],
    p
  this._init = function (a, c, b) {
    g = !1
    k = []
    q = []
    b = s_oSpriteLibrary.getSprite('bet_but')
    var f = new createjs.SpriteSheet({
      images: [b],
      frames: { width: b.width / 2, height: b.height, regX: 0, regY: 0 },
      animations: { on: [0, 1], off: [1, 2] },
    })
    p = createSprite(f, 'on', 0, 0, b.width / 2, b.height)
    p.stop()
    p.x = a
    p.y = c
    p.regX = b.width / 2
    p.regY = b.height / 2
    s_oStage.addChild(p)
    this._initListener()
  }
  this.unload = function () {
    p.off('mousedown', this.buttonDown)
    p.off('pressup', this.buttonRelease)
    s_oStage.removeChild(p)
  }
  this.disable = function (a) {
    g = a
  }
  this.setVisible = function (a) {
    p.visible = a
  }
  this.setOn = function () {
    p.gotoAndStop('on')
  }
  this.setOff = function () {
    p.gotoAndStop('off')
  }
  this._initListener = function () {
    p.on('mousedown', this.buttonDown)
    p.on('pressup', this.buttonRelease)
  }
  this.addEventListener = function (a, b, e) {
    k[a] = b
    q[a] = e
  }
  this.addEventListenerWithParams = function (a, b, g, d) {
    k[a] = b
    q[a] = g
    e = d
  }
  this.buttonRelease = function () {
    k[ON_MOUSE_UP] &&
      !1 === g &&
      (playSound('press_but', 1, !1), k[ON_MOUSE_UP].call(q[ON_MOUSE_UP], e))
  }
  this.buttonDown = function () {
    k[ON_MOUSE_DOWN] && !1 === g && k[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN], e)
  }
  this.setPosition = function (a, b) {
    p.x = a
    p.y = b
  }
  this.setX = function (a) {
    p.x = a
  }
  this.setY = function (a) {
    p.y = a
  }
  this.getButtonImage = function () {
    return p
  }
  this.getX = function () {
    return p.x
  }
  this.getY = function () {
    return p.y
  }
  this._init(a, d, b)
}
function CMenu() {
  var a,
    d,
    b,
    g,
    k,
    q,
    e = null,
    p = null,
    f,
    c,
    r,
    x,
    l,
    y
  this._init = function () {
    f = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'))
    s_oStage.addChild(f)
    var n = s_oSpriteLibrary.getSprite('but_bg')
    c = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 164,
      n,
      TEXT_PLAY,
      FONT_GAME,
      '#ffffff',
      40,
      s_oStage
    )
    c.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this)
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (n = s_oSpriteLibrary.getSprite('audio_icon')),
        (k = CANVAS_WIDTH - n.width / 4 - 10),
        (q = n.height / 2 + 10),
        (r = new CToggle(k, q, n, s_bAudioActive)),
        r.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this)
    SHOW_CREDITS
      ? ((n = s_oSpriteLibrary.getSprite('but_credits')),
        (a = n.height / 2 + 10),
        (d = n.height / 2 + 10),
        (x = new CGfxButton(a, d, n, s_oStage)),
        x.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this),
        (b = a + n.width + 10),
        (g = d))
      : ((b = n.height / 2 + 10), (g = n.height / 2 + 10))
    n = window.document
    var z = n.documentElement
    e =
      z.requestFullscreen ||
      z.mozRequestFullScreen ||
      z.webkitRequestFullScreen ||
      z.msRequestFullscreen
    p =
      n.exitFullscreen ||
      n.mozCancelFullScreen ||
      n.webkitExitFullscreen ||
      n.msExitFullscreen
    !1 === ENABLE_FULLSCREEN && (e = !1)
    e &&
      screenfull.enabled &&
      ((n = s_oSpriteLibrary.getSprite('but_fullscreen')),
      (l = new CToggle(b, g, n, s_bFullscreen, s_oStage)),
      l.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this))
    y = new createjs.Shape()
    y.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    s_oStage.addChild(y)
    createjs.Tween.get(y)
      .to({ alpha: 0 }, 400)
      .call(function () {
        y.visible = !1
      })
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
  }
  this.unload = function () {
    c.unload()
    c = null
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) r.unload(), (r = null)
    SHOW_CREDITS && x.unload()
    e && screenfull.enabled && l.unload()
    s_oStage.removeChild(f)
    f = null
    s_oStage.removeChild(y)
    s_oMenu = y = null
  }
  this.refreshButtonPos = function (c, f) {
    ;(!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      r.setPosition(k - c, f + q)
    SHOW_CREDITS && x.setPosition(a + c, d + f)
    e && screenfull.enabled && l.setPosition(b + c, g + f)
  }
  this._onButPlayRelease = function () {
    this.unload()
    $(s_oMain).trigger('start_session')
    s_oMain.gotoGame()
  }
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive)
    s_bAudioActive = !s_bAudioActive
  }
  this._onButCreditsRelease = function () {
    new CCreditsPanel()
  }
  this.resetFullscreenBut = function () {
    e && screenfull.enabled && l.setActive(s_bFullscreen)
  }
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? p.call(window.document)
      : e.call(window.document.documentElement)
    sizeHandler()
  }
  s_oMenu = this
  this._init()
}
var s_oMenu = null
function CGame(a) {
  var d = !1,
    b,
    g,
    k,
    q,
    e,
    p,
    f,
    c,
    r,
    x,
    l,
    y,
    n,
    z,
    B,
    A,
    E,
    N,
    H,
    t,
    F = null
  this._init = function () {
    b = GAME_STATE_IDLE
    y = q = g = 0
    A = [0, 1, 2, 3, 4]
    k = A[0]
    e = NUM_PAYLINES
    x = TOTAL_MONEY
    c = MIN_BET
    r = c * e
    s_oTweenController = new CTweenController()
    N = createBitmap(s_oSpriteLibrary.getSprite('bg_game'))
    s_oStage.addChild(N)
    this._initReels()
    H = new createjs.Bitmap(s_oSpriteLibrary.getSprite('mask_slot'))
    s_oStage.addChild(H)
    t = new CInterface(c, r, x)
    this._initStaticSymbols()
    F = new CPayTablePanel()
    x < r && t.disableSpin()
    d = !0
  }
  this.unload = function () {
    stopSound('reels')
    t.unload()
    F.unload()
    for (var a = 0; a < n.length; a++) n[a].unload()
    for (a = 0; a < NUM_ROWS; a++)
      for (var b = 0; b < NUM_REELS; b++) z[a][b].unload()
    s_oStage.removeAllChildren()
  }
  this._initReels = function () {
    var a = REEL_OFFSET_X,
      b = REEL_OFFSET_Y,
      c = 0
    n = []
    for (var e = 0; e < NUM_REELS; e++)
      (n[e] = new CReelColumn(e, a, b, c)),
        (n[e + NUM_REELS] = new CReelColumn(
          e + NUM_REELS,
          a,
          b + SYMBOL_SIZE * NUM_ROWS,
          c
        )),
        (a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS),
        (c += REEL_DELAY)
  }
  this._initStaticSymbols = function () {
    var a = REEL_OFFSET_X,
      b = REEL_OFFSET_Y
    z = []
    for (var c = 0; c < NUM_ROWS; c++) {
      z[c] = []
      for (var e = 0; e < NUM_REELS; e++) {
        var f = new CStaticSymbolCell(c, e, a, b)
        z[c][e] = f
        a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
      }
      a = REEL_OFFSET_X
      b += SYMBOL_SIZE
    }
  }
  this.generateFinalSymbols = function () {
    E = []
    for (var a = 0; a < NUM_ROWS; a++) {
      E[a] = []
      for (var b = 0; b < NUM_REELS; b++)
        E[a][b] =
          s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]
    }
    B = []
    for (a = l = 0; a < e; a++) {
      b = s_aPaylineCombo[a]
      var c = [],
        f = E[b[0].row][b[0].col],
        g = 1,
        d = 1
      for (
        c.push({ row: b[0].row, col: b[0].col, value: E[b[0].row][b[0].col] });
        f === WILD_SYMBOL && d < NUM_REELS;

      )
        g++,
          (f = E[b[d].row][b[d].col]),
          c.push({
            row: b[d].row,
            col: b[d].col,
            value: E[b[d].row][b[d].col],
          }),
          d++
      for (; d < b.length; d++)
        if (
          E[b[d].row][b[d].col] === f ||
          E[b[d].row][b[d].col] === WILD_SYMBOL
        )
          g++,
            c.push({
              row: b[d].row,
              col: b[d].col,
              value: E[b[d].row][b[d].col],
            })
        else break
      0 < s_aSymbolWin[f - 1][g - 1] &&
        ((l += s_aSymbolWin[f - 1][g - 1]),
        B.push({
          line: a + 1,
          amount: s_aSymbolWin[f - 1][g - 1],
          num_win: g,
          value: f,
          list: c,
        }))
    }
    return 0 < B.length ? !0 : !1
  }
  this._generateRandSymbols = function () {
    for (var a = [], b = 0; b < NUM_ROWS; b++)
      a[b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]
    return a
  }
  this.reelArrived = function (a, b) {
    if (g > MIN_REEL_LOOPS)
      if (k === b) {
        if (!1 === n[a].isReadyToStop()) {
          var c = a
          a < NUM_REELS
            ? ((c += NUM_REELS),
              n[c].setReadyToStop(),
              n[a].restart([E[0][a], E[1][a], E[2][a]], !0))
            : ((c -= NUM_REELS),
              n[c].setReadyToStop(),
              n[a].restart([E[0][c], E[1][c], E[2][c]], !0))
        }
      } else n[a].restart(this._generateRandSymbols(), !1)
    else n[a].restart(this._generateRandSymbols(), !1), 0 === a && g++
  }
  this.stopNextReel = function () {
    q++
    0 === q % 2 &&
      (playSound('reel_stop', 1, !1),
      (k = A[q / 2]),
      q === 2 * NUM_REELS && this._endReelAnimation())
  }
  this._endReelAnimation = function () {
    stopSound('reels')
    t.disableBetBut(!1)
    q = g = 0
    k = A[0]
    if (0 < B.length) {
      for (var a = 0; a < B.length; a++) {
        F.highlightCombo(B[a].value, B[a].num_win)
        t.showLine(B[a].line)
        for (var e = B[a].list, f = 0; f < e.length; f++)
          z[e[f].row][e[f].col].show(e[f].value)
      }
      l *= c
      x += l
      SLOT_CASH -= l
      0 < l && (t.refreshMoney(x), t.refreshWinText(l))
      p = 0
      b = GAME_STATE_SHOW_ALL_WIN
      playSound('win', 0.3, !1)
    } else b = GAME_STATE_IDLE
    t.enableGuiButtons()
    x < r && t.disableSpin()
    y++
    y === I && ((y = 0), $(s_oMain).trigger('show_interlevel_ad'))
    $(s_oMain).trigger('save_score', x)
  }
  this.hidePayTable = function () {
    F.hide()
  }
  this._showWin = function () {
    if (0 < f) {
      stopSound('win')
      var a = B[f - 1].line
      t.hideLine(a)
      a = B[f - 1].list
      for (var b = 0; b < a.length; b++) z[a[b].row][a[b].col].stopAnim()
    }
    f === B.length && (f = 0)
    a = B[f].line
    t.showLine(a)
    a = B[f].list
    for (b = 0; b < a.length; b++) z[a[b].row][a[b].col].show(a[b].value)
    f++
  }
  this._hideAllWins = function () {
    for (var a = 0; a < B.length; a++)
      for (var c = B[a].list, e = 0; e < c.length; e++)
        z[c[e].row][c[e].col].stopAnim()
    t.hideAllLines()
    f = p = 0
    p = TIME_SHOW_WIN
    b = GAME_STATE_SHOW_WIN
  }
  this.activateLines = function (a) {
    e = a
    this.removeWinShowing()
    r = a = c * e
    t.refreshTotalBet(r)
    t.refreshNumLines(e)
    a > x ? t.disableSpin() : t.enableSpin()
  }
  this.addLine = function () {
    e === NUM_PAYLINES ? (e = 1) : e++
    var a = c * e
    r = a = parseFloat(a.toFixed(2))
    t.refreshTotalBet(r)
    t.refreshNumLines(e)
    a > x ? t.disableSpin() : t.enableSpin()
  }
  this.changeCoinBet = function () {
    var a = Math.floor(100 * (c + 0.05)) / 100
    a > MAX_BET
      ? ((c = MIN_BET),
        (r = c * e),
        (r = parseFloat(r.toFixed(2))),
        t.refreshBet(c),
        t.refreshTotalBet(r),
        (a = r))
      : ((a *= e),
        (a = parseFloat(a.toFixed(2))),
        (c += 0.05),
        (c = Math.floor(100 * c) / 100),
        (r = a),
        t.refreshBet(c),
        t.refreshTotalBet(r))
    trace('iNewTotalBet: ' + a)
    trace('_iMoney: ' + x)
    a > x ? t.disableSpin() : t.enableSpin()
  }
  this.onMaxBet = function () {
    var a = MAX_BET
    e = NUM_PAYLINES
    a *= e
    c = MAX_BET
    r = a
    t.refreshBet(c)
    t.refreshTotalBet(r)
    t.refreshNumLines(e)
    a > x ? t.disableSpin() : (t.enableSpin(), this.onSpin())
  }
  this.removeWinShowing = function () {
    F.resetHighlightCombo()
    t.resetWin()
    for (var a = 0; a < NUM_ROWS; a++)
      for (var c = 0; c < NUM_REELS; c++) z[a][c].hide()
    for (a = 0; a < n.length; a++) n[a].activate()
    b = GAME_STATE_IDLE
  }
  this.onSpin = function () {
    stopSound('win')
    playSound('reels', 1, !1)
    t.disableBetBut(!0)
    this.removeWinShowing()
    MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1]
    for (var a = 0; a < s_aSymbolWin.length; a++)
      for (var e = s_aSymbolWin[a], f = 0; f < e.length; f++)
        0 !== e[f] && e[f] < MIN_WIN && (MIN_WIN = e[f])
    MIN_WIN *= c
    x -= r
    t.refreshMoney(x)
    SLOT_CASH += r
    $(s_oMain).trigger('bet_placed', { bet: c, tot_bet: r })
    if (SLOT_CASH < MIN_WIN) {
      do a = this.generateFinalSymbols()
      while (!0 === a)
    } else if (Math.floor(101 * Math.random()) > WIN_OCCURRENCE) {
      do a = this.generateFinalSymbols()
      while (!0 === a)
    } else {
      do a = this.generateFinalSymbols()
      while (!1 === a || l * c > SLOT_CASH)
    }
    t.hideAllLines()
    t.disableGuiButtons()
    b = GAME_STATE_SPINNING
  }
  this._printSymbol = function () {
    for (var a = 0; a < NUM_ROWS; a++)
      for (var b = 0; b < NUM_REELS; b++)
        trace('_aFinalSymbolCombo[' + a + '][' + b + ']: ' + E[a][b])
  }
  this.onInfoClicked = function () {
    b !== GAME_STATE_SPINNING && (F.isVisible() ? F.hide() : F.show())
  }
  this.onExit = function () {
    this.unload()
    $(s_oMain).trigger('end_session')
    $(s_oMain).trigger('share_event', x)
    s_oMain.gotoMenu()
  }
  this.getState = function () {
    return b
  }
  this.update = function () {
    if (!1 !== d)
      switch (b) {
        case GAME_STATE_SPINNING:
          for (var a = 0; a < n.length; a++) n[a].update()
          break
        case GAME_STATE_SHOW_ALL_WIN:
          p += s_iTimeElaps
          p > TIME_SHOW_ALL_WINS && this._hideAllWins()
          break
        case GAME_STATE_SHOW_WIN:
          ;(p += s_iTimeElaps), p > TIME_SHOW_WIN && ((p = 0), this._showWin())
      }
  }
  s_oGame = this
  WIN_OCCURRENCE = a.win_occurrence
  MIN_REEL_LOOPS = a.min_reel_loop
  REEL_DELAY = a.reel_delay
  TIME_SHOW_WIN = a.time_show_win
  TIME_SHOW_ALL_WINS = a.time_show_all_wins
  TOTAL_MONEY = a.money
  SLOT_CASH = a.slot_cash
  var I = a.ad_show_counter
  this._init()
}
var s_oGame, s_oTweenController
function CReelColumn(a, d, b, g) {
  var k, q, e, p, f, c, r, x, l, y, n, z, B, A
  this._init = function (a, b, d, g) {
    e = q = k = !1
    r = 0
    p = a
    c = g
    f = p < NUM_REELS ? p : p - NUM_REELS
    l = 0
    y = MAX_FRAMES_REEL_EASE
    x = REEL_STATE_START
    n = d
    z = n + SYMBOL_SIZE * NUM_ROWS
    this.initContainer(b, d)
  }
  this.initContainer = function (a, b) {
    A = new createjs.Container()
    A.x = a
    A.y = b
    var c = 0
    B = []
    for (var e = 0; e < NUM_ROWS; e++) {
      var f = createSprite(
        s_aSymbolData[
          s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]
        ],
        'static',
        0,
        0,
        SYMBOL_SIZE,
        SYMBOL_SIZE
      )
      f.stop()
      f.x = 0
      f.y = c
      A.addChild(f)
      B[e] = f
      c += SYMBOL_SIZE
    }
    s_oStage.addChild(A)
  }
  this.unload = function () {
    s_oStage.removeChild(A)
  }
  this.activate = function () {
    n = A.y
    z = n + SYMBOL_SIZE * NUM_ROWS
    k = !0
  }
  this._setSymbol = function (a) {
    A.removeAllChildren()
    for (var b = 0, c = 0; c < a.length; c++) {
      var e = new createjs.Sprite(
        s_aSymbolData[a[c]],
        'static',
        0,
        0,
        SYMBOL_SIZE,
        SYMBOL_SIZE
      )
      e.stop()
      e.x = 0
      e.y = b
      A.addChild(e)
      B[c] = e
      b += SYMBOL_SIZE
    }
  }
  this.restart = function (a, b) {
    A.y = n = REEL_START_Y
    z = n + SYMBOL_SIZE * NUM_ROWS
    this._setSymbol(a)
    if ((q = b)) {
      l = 0
      y = MAX_FRAMES_REEL_EASE
      x = REEL_STATE_STOP
      for (var c = 0; c < NUM_ROWS; c++) B[c].gotoAndStop('static')
      e = !0
    } else for (c = 0; c < NUM_ROWS; c++) B[c].gotoAndStop('moving')
  }
  this.setReadyToStop = function () {
    l = 0
    y = MAX_FRAMES_REEL_EASE
    x = REEL_STATE_STOP
  }
  this.isReadyToStop = function () {
    return q
  }
  this._updateStart = function () {
    0 === l && p < NUM_REELS && playSound('start_reel', 0.3, !1)
    l++
    l > y &&
      ((l = 0), (y /= 2), x++, (n = A.y), (z = n + SYMBOL_SIZE * NUM_ROWS))
    var a = s_oTweenController.easeInBack(l, 0, 1, y)
    a = s_oTweenController.tweenValue(n, z, a)
    A.y = a
  }
  this._updateMoving = function () {
    l++
    l > y && ((l = 0), (n = A.y), (z = n + SYMBOL_SIZE * NUM_ROWS))
    var a = s_oTweenController.easeLinear(l, 0, 1, y)
    a = s_oTweenController.tweenValue(n, z, a)
    A.y = a
  }
  this._updateStopping = function () {
    l++
    if (l >= y)
      (k = !1),
        (l = 0),
        (y = MAX_FRAMES_REEL_EASE),
        (x = REEL_STATE_START),
        (r = 0),
        (q = !1),
        e && ((e = !1), (A.y = REEL_OFFSET_Y)),
        s_oGame.stopNextReel()
    else {
      var a = s_oTweenController.easeOutCubic(l, 0, 1, y)
      a = s_oTweenController.tweenValue(n, z, a)
      A.y = a
    }
  }
  this.update = function () {
    if (!1 !== k && (r++, r > c))
      switch (
        (!1 === q && A.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(p, f), x)
      ) {
        case REEL_STATE_START:
          this._updateStart()
          break
        case REEL_STATE_MOVING:
          this._updateMoving()
          break
        case REEL_STATE_STOP:
          this._updateStopping()
      }
  }
  this._init(a, d, b, g)
}
function CInterface(a, d, b) {
  var g,
    k,
    q,
    e,
    p,
    f,
    c,
    r,
    x,
    l,
    y,
    n,
    z,
    B,
    A,
    E = null,
    N = null,
    H,
    t,
    F,
    I,
    m,
    K
  this._init = function (a, b, d) {
    var u = s_oSpriteLibrary.getSprite('but_exit')
    q = CANVAS_WIDTH - u.width / 2 - 2
    e = u.height / 2 + 2
    x = new CGfxButton(q, e, u, !0)
    x.addEventListener(ON_MOUSE_UP, this._onExit, this)
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((p = x.getX() - u.width),
        (f = u.height / 2 + 2),
        (z = new CToggle(
          p,
          f,
          s_oSpriteLibrary.getSprite('audio_icon'),
          s_bAudioActive
        )),
        z.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        (g = p - u.width),
        (k = f))
      : ((g = x.getX() - u.width), (k = u.height / 2 + 2))
    u = window.document
    var L = u.documentElement
    E =
      L.requestFullscreen ||
      L.mozRequestFullScreen ||
      L.webkitRequestFullScreen ||
      L.msRequestFullscreen
    N =
      u.exitFullscreen ||
      u.mozCancelFullScreen ||
      u.webkitExitFullscreen ||
      u.msExitFullscreen
    !1 === ENABLE_FULLSCREEN && (E = !1)
    E &&
      screenfull.enabled &&
      ((u = s_oSpriteLibrary.getSprite('but_fullscreen')),
      (K = new CToggle(g, k, u, s_bFullscreen, s_oStage)),
      K.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this))
    u = s_oSpriteLibrary.getSprite('spin_but')
    l = new CTextButton(
      1026 + u.width / 2,
      595,
      u,
      TEXT_SPIN,
      FONT_GAME,
      '#ffffff',
      30,
      s_oStage
    )
    l.addEventListener(ON_MOUSE_UP, this._onSpin, this)
    u = s_oSpriteLibrary.getSprite('info_but')
    y = new CTextButton(
      296 + u.width / 2,
      595,
      u,
      TEXT_INFO,
      FONT_GAME,
      '#ffffff',
      30,
      s_oStage
    )
    y.addEventListener(ON_MOUSE_UP, this._onInfo, this)
    u = s_oSpriteLibrary.getSprite('but_lines_bg')
    n = new CTextButton(
      436 + u.width / 2,
      595,
      u,
      TEXT_LINES,
      FONT_GAME,
      '#ffffff',
      30,
      s_oStage
    )
    n.addEventListener(ON_MOUSE_UP, this._onAddLine, this)
    u = s_oSpriteLibrary.getSprite('coin_but')
    B = new CTextButton(
      620 + u.width / 2,
      595,
      u,
      TEXT_COIN,
      FONT_GAME,
      '#ffffff',
      30,
      s_oStage
    )
    B.addEventListener(ON_MOUSE_UP, this._onBet, this)
    u = s_oSpriteLibrary.getSprite('but_maxbet_bg')
    A = new CTextButton(
      805 + u.width / 2,
      595,
      u,
      TEXT_MAX_BET,
      FONT_GAME,
      '#ffffff',
      30,
      s_oStage
    )
    A.addEventListener(ON_MOUSE_UP, this._onMaxBet, this)
    t = new createjs.Text(
      TEXT_MONEY + '\n' + d.toFixed(2) + TEXT_CURRENCY,
      '24px ' + FONT_GAME,
      '#ffde00'
    )
    t.x = 408
    t.y = 14
    t.textAlign = 'center'
    s_oStage.addChild(t)
    I = new createjs.Text(NUM_PAYLINES, '30px ' + FONT_GAME, '#ffffff')
    I.x = 530
    I.y = CANVAS_HEIGHT - 96
    I.textAlign = 'center'
    I.textBaseline = 'alphabetic'
    s_oStage.addChild(I)
    H = new createjs.Text(a.toFixed(2), '30px ' + FONT_GAME, '#ffffff')
    H.x = 712
    H.y = CANVAS_HEIGHT - 96
    H.textAlign = 'center'
    H.textBaseline = 'alphabetic'
    s_oStage.addChild(H)
    F = new createjs.Text(
      TEXT_BET + ': ' + b.toFixed(2),
      '30px ' + FONT_GAME,
      '#ffffff'
    )
    F.x = 918
    F.y = CANVAS_HEIGHT - 96
    F.textAlign = 'center'
    F.textBaseline = 'alphabetic'
    s_oStage.addChild(F)
    m = new createjs.Text('', '24px ' + FONT_GAME, '#ffde00')
    m.x = 1116
    m.y = CANVAS_HEIGHT - 96
    m.textAlign = 'center'
    m.textBaseline = 'alphabetic'
    s_oStage.addChild(m)
    u = s_oSpriteLibrary.getSprite('bet_but')
    c = []
    a = u.height / 2
    b = 84 + a
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4)
    c[3] = d
    b += 43
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2)
    c[1] = d
    b += 43
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20)
    c[19] = d
    b += 43
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16)
    c[15] = d
    b += 43
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10)
    c[9] = d
    b += 43
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1)
    c[0] = d
    b += 44
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11)
    c[10] = d
    b += 43
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17)
    c[16] = d
    b += 43
    d = new CBetBut(319 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3)
    c[2] = d
    d = new CBetBut(319 + u.width / 2, b + 43, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5)
    c[4] = d
    b = 84 + a
    d = new CBetBut(1130 + u.width / 2, b, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14)
    c[13] = d
    b += 43
    d = new CBetBut(1130 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12)
    c[11] = d
    b += 43
    d = new CBetBut(1130 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9)
    c[8] = d
    b += 43
    d = new CBetBut(1130 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18)
    c[17] = d
    b += 43
    d = new CBetBut(1130 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6)
    c[5] = d
    b += 44
    d = new CBetBut(1130 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7)
    c[6] = d
    b += 43
    d = new CBetBut(1130 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19)
    c[18] = d
    b += 43
    d = new CBetBut(1130 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8)
    c[7] = d
    b += 43
    d = new CBetBut(1130 + u.width / 2, b, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13)
    c[12] = d
    d = new CBetBut(1130 + u.width / 2, b + 43, u, !0)
    d.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15)
    c[14] = d
    r = []
    for (u = 0; u < NUM_PAYLINES; u++)
      (a = createBitmap(s_oSpriteLibrary.getSprite('payline_' + (u + 1)))),
        (a.visible = !1),
        s_oStage.addChild(a),
        (r[u] = a)
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
  }
  this.unload = function () {
    x.unload()
    x = null
    l.unload()
    l = null
    y.unload()
    y = null
    n.unload()
    n = null
    B.unload()
    B = null
    A.unload()
    A = null
    !1 === DISABLE_SOUND_MOBILE && (z.unload(), (z = null))
    E && screenfull.enabled && K.unload()
    for (var a = 0; a < NUM_PAYLINES; a++) c[a].unload()
    s_oInterface = null
  }
  this.refreshButtonPos = function (a, b) {
    x.setPosition(q - a, b + e)
    ;(!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      z.setPosition(p - a, b + f)
    E && screenfull.enabled && K.setPosition(g - a, k + b)
  }
  this.refreshMoney = function (a) {
    t.text = TEXT_MONEY + '\n' + a.toFixed(2) + TEXT_CURRENCY
  }
  this.refreshBet = function (a) {
    H.text = a.toFixed(2)
  }
  this.refreshTotalBet = function (a) {
    F.text = TEXT_BET + ': ' + a.toFixed(2)
  }
  this.refreshNumLines = function (a) {
    I.text = a
    for (var b = 0; b < NUM_PAYLINES; b++)
      b < a ? (c[b].setOn(), (r[b].visible = !0)) : c[b].setOff()
    setTimeout(function () {
      for (var a = 0; a < NUM_PAYLINES; a++) r[a].visible = !1
    }, 1e3)
  }
  this.resetWin = function () {
    m.text = ' '
  }
  this.refreshWinText = function (a) {
    m.text = TEXT_WIN + ' ' + a.toFixed(2) + TEXT_CURRENCY
  }
  this.showLine = function (a) {
    r[a - 1].visible = !0
  }
  this.hideLine = function (a) {
    r[a - 1].visible = !1
  }
  this.hideAllLines = function () {
    for (var a = 0; a < NUM_PAYLINES; a++) r[a].visible = !1
  }
  this.disableBetBut = function (a) {
    for (var b = 0; b < NUM_PAYLINES; b++) c[b].disable(a)
  }
  this.enableGuiButtons = function () {
    l.enable()
    A.enable()
    B.enable()
    n.enable()
    y.enable()
  }
  this.enableSpin = function () {
    l.enable()
    A.enable()
  }
  this.disableSpin = function () {
    l.disable()
    A.disable()
  }
  this.disableGuiButtons = function () {
    l.disable()
    A.disable()
    B.disable()
    n.disable()
    y.disable()
  }
  this._onBetLineClicked = function (a) {
    this.refreshNumLines(a)
    s_oGame.activateLines(a)
  }
  this._onExit = function () {
    s_oGame.onExit()
  }
  this._onSpin = function () {
    s_oGame.onSpin()
  }
  this._onAddLine = function () {
    s_oGame.addLine()
  }
  this._onInfo = function () {
    s_oGame.onInfoClicked()
  }
  this._onBet = function () {
    s_oGame.changeCoinBet()
  }
  this._onMaxBet = function () {
    s_oGame.onMaxBet()
  }
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive)
    s_bAudioActive = !s_bAudioActive
  }
  this.resetFullscreenBut = function () {
    E && screenfull.enabled && K.setActive(s_bFullscreen)
  }
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? N.call(window.document)
      : E.call(window.document.documentElement)
    sizeHandler()
  }
  s_oInterface = this
  this._init(a, d, b)
  return this
}
var s_oInterface = null
function CPayTablePanel() {
  var a, d, b, g, k
  this._init = function () {
    k = new createjs.Container()
    g = createBitmap(s_oSpriteLibrary.getSprite('paytable'))
    k.addChild(g)
    this._createPayouts()
    b = new createjs.Text(TEXT_HELP_WILD, '26px ' + FONT_GAME, '#ffff00')
    b.textAlign = 'center'
    b.lineWidth = 450
    b.x = 986
    b.y = 480
    k.addChild(b)
    k.visible = !1
    s_oStage.addChild(k)
    var a = this
    k.on('pressup', function () {
      a._onExit()
    })
  }
  this.unload = function () {
    var b = this
    k.off('pressup', function () {
      b._onExit()
    })
    s_oStage.removeChild(k)
    for (var e = 0; e < a.length; e++) k.removeChild(a[e])
    for (e = 0; e < d.length; e++) k.removeChild(d[e])
  }
  this._createPayouts = function () {
    a = []
    d = []
    for (
      var b = [
          { x: 450, y: 122 },
          { x: 450, y: 302 },
          { x: 450, y: 486 },
          { x: 780, y: 122 },
          { x: 780, y: 302 },
          { x: 1100, y: 122 },
          { x: 1100, y: 302 },
        ],
        e = 0,
        g = 0;
      g < s_aSymbolWin.length;
      g++
    ) {
      for (var f = [], c = 0; c < s_aSymbolWin[g].length; c++)
        f[c] = s_aSymbolWin[g][c]
      do (c = f.indexOf(0)), -1 !== c && f.splice(c, 1)
      while (-1 !== c)
      c = f.length
      if (0 !== c) {
        var r = 30
        4 === c && (r = 22)
        var x = b[e].y
        a[g] = []
        d[g] = []
        for (var l = 0; l < c; l++) {
          var y = new createjs.Text(
            'X' + (5 - l),
            '25px ' + FONT_GAME,
            '#ffffff'
          )
          y.textAlign = 'center'
          y.x = b[e].x
          y.y = x
          y.textBaseline = 'alphabetic'
          k.addChild(y)
          a[g][l] = y
          var n = new createjs.Text(
            f[c - l - 1],
            '25px ' + FONT_GAME,
            '#ffff00'
          )
          n.textAlign = 'center'
          n.x = y.x + 50
          n.y = y.y
          n.textBaseline = 'alphabetic'
          k.addChild(n)
          d[g][l] = n
          x += r
        }
        e++
      }
    }
  }
  this.show = function () {
    k.visible = !0
  }
  this.hide = function () {
    k.visible = !1
  }
  this.resetHighlightCombo = function () {
    for (var b = 0; b < a.length; b++)
      for (var e = 0; e < a[b].length; e++)
        (a[b][e].color = '#ffffff'),
          (d[b][e].color = '#ffff00'),
          createjs.Tween.removeTweens(d[b][e]),
          (d[b][e].alpha = 1)
  }
  this.highlightCombo = function (a, b) {
    d[a - 1][NUM_REELS - b].color = '#ff0000'
    this.tweenAlpha(d[a - 1][NUM_REELS - b], 0)
  }
  this.tweenAlpha = function (a, b) {
    var d = this
    createjs.Tween.get(a)
      .to({ alpha: b }, 200)
      .call(function () {
        1 === b ? d.tweenAlpha(a, 0) : d.tweenAlpha(a, 1)
      })
  }
  this._onExit = function () {
    s_oGame.hidePayTable()
  }
  this.isVisible = function () {
    return k.visible
  }
  this._init()
}
function CStaticSymbolCell(a, d, b, g) {
  var k = -1,
    q,
    e,
    p,
    f
  this._init = function (a, b, d, g) {
    f = new createjs.Container()
    f.visible = !1
    e = []
    for (a = 0; a < NUM_SYMBOLS; a++)
      (b = createSprite(
        s_aSymbolAnims[a],
        'static',
        0,
        0,
        SYMBOL_SIZE,
        SYMBOL_SIZE
      )),
        b.stop(),
        (b.x = d),
        (b.y = g),
        b.on('animationend', this._onAnimEnded, null, !1, { index: a }),
        f.addChild(b),
        (e[a] = b),
        (e[a].visible = !1)
    a = {
      framerate: 60,
      images: [s_oSpriteLibrary.getSprite('win_frame_anim')],
      frames: { width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0 },
      animations: { static: [0, 1], anim: [1, 19] },
    }
    a = new createjs.SpriteSheet(a)
    p = new createjs.Sprite(a, 'static', 0, 0, SYMBOL_SIZE, SYMBOL_SIZE)
    p.stop()
    p.x = d
    p.y = g
    f.addChild(p)
    s_oStage.addChild(f)
  }
  this.unload = function () {
    s_oStage.removeChild(f)
  }
  this.hide = function () {
    ;-1 < k &&
      (p.gotoAndStop('static'),
      (p.visible = !1),
      e[k].gotoAndPlay('static'),
      (f.visible = !1))
  }
  this.show = function (a) {
    p.gotoAndPlay('anim')
    p.visible = !0
    for (var b = 0; b < NUM_SYMBOLS; b++) e[b].visible = b + 1 === a ? !0 : !1
    e[a - 1].gotoAndPlay('anim')
    k = a - 1
    q = e[a - 1].spriteSheet.getNumFrames()
    f.visible = !0
  }
  this._onAnimEnded = function (a, b) {
    e[b.index].currentFrame !== q &&
      (e[b.index].stop(),
      setTimeout(function () {
        e[b.index].gotoAndPlay(1)
      }, 100))
  }
  this.stopAnim = function () {
    e[k].gotoAndStop('static')
    e[k].visible = !1
    p.gotoAndStop('static')
    p.visible = !1
  }
  this._init(a, d, b, g)
}
function CTweenController() {
  this.tweenValue = function (a, d, b) {
    return a + b * (d - a)
  }
  this.easeLinear = function (a, d, b, g) {
    return (b * a) / g + d
  }
  this.easeInCubic = function (a, d, b, g) {
    g = (a /= g) * a * a
    return d + b * g
  }
  this.easeBackInQuart = function (a, d, b, g) {
    g = (a /= g) * a
    return d + b * (2 * g * g + 2 * g * a + -3 * g)
  }
  this.easeInBack = function (a, d, b, g) {
    return b * (a /= g) * a * (2.70158 * a - 1.70158) + d
  }
  this.easeOutBack = function (a, d, b, g, k) {
    void 0 == k && (k = 1.70158)
    return b * ((a = a / g - 1) * a * ((k + 1) * a + k) + 1) + d
  }
  this.easeOutCubic = function (a, d, b, g) {
    return b * ((a = a / g - 1) * a * a + 1) + d
  }
}
function CCreditsPanel() {
  var a, d, b, g, k, q, e, p, f, c
  this._init = function () {
    c = new createjs.Container()
    c.alpha = 0
    s_oStage.addChild(c)
    var r = new createjs.Shape()
    r.graphics
      .beginFill('rgba(0,0,0,0.7)')
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    c.addChild(r)
    d = createBitmap(s_oSpriteLibrary.getSprite('msg_box'))
    c.addChild(d)
    e = new createjs.Shape()
    e.graphics.beginFill('#0f0f0f').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    e.alpha = 0.01
    e.on('click', this._onLogoButRelease)
    c.addChild(e)
    r = s_oSpriteLibrary.getSprite('but_exit')
    a = CANVAS_WIDTH / 2 + 390
    g = new CGfxButton(a, 185, r, c)
    g.addEventListener(ON_MOUSE_UP, this.unload, this)
    q = new createjs.Text(TEXT_CREDITS_DEVELOPED, '40px ' + FONT_GAME, '#000')
    q.textAlign = 'center'
    q.textBaseline = 'alphabetic'
    q.x = CANVAS_WIDTH / 2
    q.y = 270
    q.outline = 3
    c.addChild(q)
    k = new createjs.Text(TEXT_CREDITS_DEVELOPED, '40px ' + FONT_GAME, '#fff')
    k.textAlign = 'center'
    k.textBaseline = 'alphabetic'
    k.x = CANVAS_WIDTH / 2
    k.y = 270
    c.addChild(k)
    r = s_oSpriteLibrary.getSprite('logo_ctl')
    b = createBitmap(r)
    b.regX = r.width / 2
    b.regY = r.height / 2
    b.x = CANVAS_WIDTH / 2
    b.y = CANVAS_HEIGHT / 2
    c.addChild(b)
    f = new createjs.Text('www.codethislab.com', '34px ' + FONT_GAME, '#000')
    f.textAlign = 'center'
    f.textBaseline = 'alphabetic'
    f.x = CANVAS_WIDTH / 2
    f.y = 395
    f.outline = 3
    c.addChild(f)
    p = new createjs.Text('www.codethislab.com', '34px ' + FONT_GAME, '#fff')
    p.textAlign = 'center'
    p.textBaseline = 'alphabetic'
    p.x = CANVAS_WIDTH / 2
    p.y = 395
    c.addChild(p)
    createjs.Tween.get(c).to({ alpha: 1 }, 600, createjs.Ease.cubicOut)
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
  }
  this.refreshButtonPos = function (a, b) {}
  this.unload = function () {
    e.off('click', this._onLogoButRelease)
    g.unload()
    g = null
    s_oStage.removeChild(c)
  }
  this._onLogoButRelease = function () {
    window.open('http://www.codethislab.com/index.php?&l=en', '_blank')
  }
  this._init()
}
