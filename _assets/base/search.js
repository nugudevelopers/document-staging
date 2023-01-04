// SPDX-FileCopyrightText: Copyright 2022 SK TELECOM CO., LTD.
// SPDX-License-Identifier: Apache-2.0

(($) => {
  class SearchResults {
    constructor(keyword, per_size) {
      this.page_index_line_numbers_map = new Map()
      this.keyword = keyword
      this.per_size = per_size
      this.search_results = []
    }

    contains(page, index, line_number) {
      if (!this.page_index_line_numbers_map.has(page.url)) {
        this.page_index_line_numbers_map.set(page.url, new Map())
      }

      if (!this.page_index_line_numbers_map.get(page.url).has(index.hash)) {
        this.page_index_line_numbers_map.get(page.url).set(index.hash, [])
      }

      return this.page_index_line_numbers_map.get(page.url).get(index.hash).find(line_numbers => line_numbers.includes(line_number))
    }

    static create_line_numbers(line_number, total_size, per_size) {
      let start = Math.max(0, line_number - (Math.floor(per_size / 2) - (1 - (per_size % 2))))
      let end = Math.min(total_size, start + per_size)

      let n = []

      for (start; start < end; start++) {
        n.push(start)
      }

      return n
    }

    add_line_number(page, index, index_order, line_number) {
      if (!this.contains(page, index, line_number)) {
        let line_numbers = SearchResults.create_line_numbers(line_number, index.sentences.length, this.per_size)
        this.page_index_line_numbers_map.get(page.url).get(index.hash).push(line_numbers)

        this.search_results.push(new SearchResult(page, index, index_order, this.keyword, line_number, line_numbers))
      }
    }

    result() {
      this.search_results.sort((r1, r2) => {
        if (r1.page_order === r2.page_order) {
          if (r1.index_order === r2.index_order) {
            return r1.line_number - r2.line_number
          }

          return r1.index_order - r2.index_order
        }

        return r1.page_order - r2.page_order
      })

      return this.search_results
    }
  }

  class SearchResult {
    constructor(page, index, index_order, keyword, line_number, line_numbers) {
      this.url = page.url + index.hash
      this.title = index.title
      this.page_order = page.order
      this.index_order = index_order
      this.line_number = line_number
      this.sentences = line_numbers.map(n => index.sentences[n].replace(new RegExp('(' + keyword + ')', 'gi'), '<code>$1</code>'))
    }
  }

  class Search {
    constructor(options) {
      this.options = options
      this.loaded = false
      this.page_indexes = []
    }

    init() {
    }

    load_search_file(callback) {
      $.getJSON('/document-staging/_assets/base/search.json', data => {
        this.loaded = true
        this.page_indexes = data
        if (callback) {
          callback.call(this)
        }
      })
    }

    search(keyword, context, callback) {
      if (this.loaded) {
        let search_results = new SearchResults(keyword, 3)

        this.page_indexes.forEach((page) => {
          page.indexes.forEach((index, index_order) => {
            index.sentences.forEach((sentence, line_number) => {
              if (new RegExp(keyword, 'i').test(sentence)) {
                search_results.add_line_number(page, index, index_order, line_number)
              }
            })
          })
        })

        if (callback && callback instanceof Function) {
          callback.call(context, search_results.result())
        }
      } else {
        this.load_search_file(() => {
          this.search(keyword, context, callback)
        })
      }
    }
  }

  $.search = (options) => {
    return new Search(options)
  }
})(jQuery)
