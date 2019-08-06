$(function () {
  class Page {
    static HASH_REGEX = new RegExp('([^#]*)#([^#]*)')

    constructor() {
      this.main = $('#container')
      this.main_wrapper = $('#container_wrapper')
      this.nav = $('nav')

      this.dimmed_area = $('div.dimmed')

      this.image_area = $('div.popup.image')
      this.modal_image = $('#modal_image')

      this.search_area = $('div.popup-md.search')
      this.search_input = $('#search_keyword')
      this.search_results = $('#search_result')

      this.keyupEventHandlers = []

      this.navigation = $.navigation()
      this.header = $.header()
      this.search = $.search()
      this.tabs = $.tabs()
      this.code = $.code()
    }

    init() {
      let context = this
      $(document).keydown(e => {
        this.keyupEventHandlers.forEach(handler => {
          if (e.keyCode === handler.keyCode || e.which === handler.keyCode) {
            if (handler.condition && handler.condition.call(context)) {
              handler.accept.call(context, e)
            } else {
              handler.accept.call(context, e)
            }
          }
        })
      })

      Page.on(this, this.dimmed_area, 'click', e => {
        this.dimmed_area.hide()
        this.image_area.hide()
        this.search_area.hide()
      })

      Page.on(this, this.modal_image, 'load', () => {
        this.dimmed_area.show()
        this.image_area.show()
      })

      Page.on(this, $('.search-round'), 'click', () => {
        this.search_results.children().remove()
        this.dimmed_area.show()
        this.search_area.show()
        this.search_input.focus()
      })

      Page.on(this, this.search_area.find('button.icon--close-lg'), 'click', () => {
        this.search_results.children().remove()
        this.dimmed_area.hide()
        this.search_area.hide()
      })

      Page.on(this, this.search_input, 'keyup', e => {
        if (e.keyCode === 13 || e.which === 13) {
          this.search_keyword()
        }
      })

      Page.on(this, this.search_area.find('button.icon--search'), 'click', () => {
        this.search_keyword()
      })

      this.keyupEventHandlers.push({
        'keyCode': 27,
        'accept': () => {
          this.dimmed_area.hide()
          this.image_area.hide()
          this.search_area.hide()
        }
      })

      Page.on(this, $('[data-nav-link]'), 'click', this.updateMainContent)

      Page.on(this, $(window), 'popstate', () => {
        this.loadPage($(location).attr('pathname') + $(location).attr('hash'))
      })

      Page.on(this, $('#open_nav'), 'click', () => {
        if (this.nav.hasClass('open')) {
          this.nav.removeClass('open')
        } else {
          this.nav.addClass('open')
        }
      })

      this.navigation.init($(location).attr('pathname'))
      this.header.init()
      this.tabs.init()
      this.code.init()

      this.updateMainImages()
      this.updateMainLinks()

      if ($(location).attr('hash')) {
        this.goHash($(location).attr('hash'))
      } else {
        this.main_wrapper.scrollTop(0)
      }
    }

    updateMainImages() {
      let expandableImages = $('img.img-internal:not(.img-inline):not([data-handled])')

      Page.on(this, expandableImages, 'click', e => {
        this.modal_image.attr('src', $(e.currentTarget).attr('src'))
      })

      expandableImages.attr('data-handled', true)
    }

    updateMainLinks() {
      // #, /로 시작하는 내부링크의 경우 페이지내 전환을 위해 click 이벤트를 조작한다.
      let absolute_links = $('a.a-internal[href]:not([data-nav-link]):not([data-handled])')
      let only_hash_links = $('a.hash-internal[href]:not([data-nav-link]):not([data-handled])')

      Page.on(this, absolute_links, 'click', this.updateMainContent)
      Page.on(this, only_hash_links, 'click', this.updateHash)

      absolute_links.attr('data-handled', true)
      only_hash_links.attr('data-handled', true)
    }

    loadPage(pathname, callback) {
      this.main_wrapper.load(pathname + ' #container', (html, status) => {
        if (status !== 'success') {
          return
        }
        this.main_wrapper.scrollTop(0)
        let title = html.match('<title>(.*?)</title>')[1]
        document.title = title

        if (Page.hasHash(pathname)) {
          this.goHash(Page.getHash(pathname))
        } else {
          this.main_wrapper.scrollTop(0)
        }

        this.header.init()
        this.tabs.init()
        this.code.init()

        this.updateMainImages()
        this.updateMainLinks()

        if (callback) {
          callback.call(this, title)
        }
      })
    }

    updateMainContent(e) {
      e.preventDefault()

      let pathname = $(e.currentTarget).attr('href')

      if (Page.matchPath($(location).attr('pathname'), pathname)) {
        return
      }

      this.loadPage(pathname, title => {
        if (typeof (history.pushState) !== 'undefined') {
          history.pushState(null, title, pathname)
        }

        this.navigation.init($(location).attr('pathname'))

        if (this.nav.hasClass('open')) {
          this.nav.removeClass('open')
        }
      })
    }

    updateHash(e) {
      e.preventDefault()

      let hash = $(e.currentTarget).attr('href')

      this.goHash(hash)

      if (typeof (history.pushState) !== 'undefined') {
        history.pushState(null, document.title, $(location).attr('pathname') + hash)
      }
    }

    search_keyword() {
      if (this.search_input.val().trim().length >= 2) {
        this.search_results.children().remove()

        this.search.search(this.search_input.val(), this, results => {
          this.search_results.html($.templates('#search_contents_tmpl').render(results))
        })
      }
    }

    goHash(hash) {
      let $hash = $(decodeURI(hash))
      if ($hash.length) {
        let hash_top = ($hash.prop('tagName') === 'A') ? $hash.parent().offset().top : $hash.offset().top
        this.main_wrapper.scrollTop(hash_top - this.main_wrapper.position().top + this.main_wrapper.scrollTop())
      }
    }

    static matchPath(path, requestPath) {
      return new RegExp(path + '(/|/?#([^/]*))?$').test(requestPath)
    }

    static hasHash(path) {
      return Page.HASH_REGEX.test(path)
    }

    static getHash(path) {
      return path.replace(Page.HASH_REGEX, '#$2')
    }

    static on(context, selector, eventType, func) {
      selector.off(eventType)
      selector.on(eventType, e => func.call(context, e))
    }
  }

  let page = new Page()
  page.init()
})
