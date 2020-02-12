
function generate(url, opts) {
  var url = url.replace(/<%-sUrl%>/g, encodeURIComponent(opts.sUrl))
    .replace(/<%-sTitle%>/g, opts.sTitle)
    .replace(/<%-sDesc%>/g, opts.sDesc)
    .replace(/<%-sPic%>/g, encodeURIComponent(opts.sPic));

  window.open(url);
}

function showWX() {
  let $wx = $('.wx-share-modal')
  let $mask = $('#share-mask')
  $wx.addClass('in')
  $wx.addClass('ready')
  $mask.show()
}

function hideWX() {
  let $wx = $('.wx-share-modal')
  let $mask = $('#share-mask')
  $wx.removeClass('in')
  $wx.removeClass('ready')
  $mask.hide()
}

function handleClick(type, opts) {
  if (type === 'weibo') {
    generate('http://service.weibo.com/share/share.php?url=<%-sUrl%>&title=<%-sTitle%>&pic=<%-sPic%>', opts)
  } else if (type === 'qq') {
    generate('http://connect.qq.com/widget/shareqq/index.html?url=<%-sUrl%>&title=<%-sTitle%>&source=<%-sDesc%>', opts)
  } else if (type === 'douban') {
    generate('https://www.douban.com/share/service?image=<%-sPic%>&href=<%-sUrl%>&name=<%-sTitle%>&text=<%-sDesc%>', opts)
  } else if (type === 'qzone') {
    generate('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=<%-sUrl%>&title=<%-sTitle%>&pics=<%-sPic%>&summary=<%-sDesc%>', opts)
  } else if (type === 'facebook') {
    generate('https://www.facebook.com/sharer/sharer.php?u=<%-sUrl%>', opts)
  } else if (type === 'twitter') {
    generate('https://twitter.com/intent/tweet?text=<%-sTitle%>&url=<%-sUrl%>&via=<%-config.url%>', opts)
  } else if (type === 'google') {
    generate('https://plus.google.com/share?url=<%-sUrl%>', opts)
  } else if (type === 'weixin') {
    showWX();
  }
}

let init = function () {
  let $sns = document.querySelectorAll('.share-sns');
  if (!$sns || $sns.length === 0) return;

  let sUrl = window.location.href;
  let sTitle = document.querySelector('title').innerHTML;
  let $img = document.querySelectorAll('.article-entry img');
  let sPic = $img.length ? document.querySelector('.article-entry img').getAttribute('src') : '';
  if ((sPic !== '') && !/^(http:|https:)?\/\//.test(sPic)) {
    sPic = window.location.origin + sPic
  }

  $sns.forEach(($em) => {
    $em.onclick = (e) => {
      let type = $em.getAttribute('data-type')
      handleClick(type, {
        sUrl: sUrl,
        sPic: sPic,
        sTitle: sTitle,
        sDesc: sTitle
      })
    }
  })

  document.querySelector('#mask').onclick = hideWX
  document.querySelector('.modal-close').onclick = hideWX
}

init()