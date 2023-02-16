const pagination = {
  emits: ['pageNum'],
  props: ['pagination'],
  methods: {
    changePage(pageNum) {
      this.$emit('emit-page', pageNum);
    }
  },
  template: `
     <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">

          <li class="page-item" :class="{disabled: pagination.current_page === 1}" @click.prevent="changePage(1)">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li class="page-item" v-for="pageNum in pagination.total_pages"
            :class="{active: pagination.current_page === pageNum}" @click.prevent="changePage(pageNum)" :key="pageNum">
            <a class="page-link" href="#">{{pageNum}}</a>
          </li>

          <li class="page-item" :class="{disabled: pagination.current_page === pagination.total_pages}"
            @click.prevent="changePage(pagination.current_page + 1)">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>

        </ul>
      </nav>
`,
};

export { pagination };