<template>
  <div class="rounded-md flex items-center top-nav">
    <h3 class="font-normal search-text">Search by release date:</h3>
    <Datepicker v-model="releaseDate" 
      range 
      :format="'MM/dd/yyyy'" 
      :disabled="loading" 
      class="mr-auto w-80" />

    <button class="px-3 py-2 hover:bg-sky-700 search-btn"
      @click="searchHandler" 
      :disabled="loading">
      Search
    </button>
  </div>

  <div v-if="loading" class="flex items-center justify-center h-80">
    <Loading />
  </div>
  <div v-else class="grid grid-cols-3 gap-9 movie-list">
    <template v-for="movie in movieList" :key="movie.id">
      <MovieCard :genreList="genreList" :movie="movie" />
    </template>
  </div>

  <div class="text-center paging">
    <div class="paging-navigations">
      <button class="py-2.5 px-7 paging-btn" 
        :class="{ 'text-disabled': (page == 1) || isEmpty }"
        @click="pagination('perv')" 
        :disabled="(page == 1) || isEmpty">
        Previous Page
      </button>

      <button class="py-2.5 px-7 border-l-2 border-slate-400 paging-btn"
        :class="{ 'text-disabled': (page == totalPages) || isEmpty }" 
        @click="pagination('next')"
        :disabled="(page == totalPages) || isEmpty">
        Next Page
      </button>
    </div>

    <p class="mt-3.5 text-slate-400 paging-result">
      Showing results {{ pageIndex() }}
    </p>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import MovieCard from '@/components/MovieCard.vue';
import { ApiFactory } from '@/api-factory.js';
import axios from 'axios';

export default {
  components: {
    Loading,
    MovieCard
  },

  data() {
    return {
      movieList: [],
      genreList: [],
      page: 1,
      totalPages: 1,
      totalItems: 0,
      loading: false,
      releaseDate: ["", ""],
      textInputOptions: {
        format: 'MM.dd.yyyy'
      },
      isEmpty: true
    }
  },

  methods: {
    // Search button click
    searchHandler() {
      this.page = 1;
      this.getAllMovies();
    },

    // Next/Perv button click
    pagination(step) {
      if (step == 'next') {
        this.page++;
        this.getAllMovies();
      } else {
        this.page--;
        this.getAllMovies();
      }
    },

    // Get movie list from API
    getAllMovies() {
      this.loading = true;
      axios.get(ApiFactory.MovieList,
        {
          params: {
            api_key: ApiFactory.ApiKey,
            page: this.page,
            "release_date.gte": !!this.releaseDate ? this.releaseDate[0] : null,
            "release_date.lte": !!this.releaseDate ? this.releaseDate[1] : null,
          }
        })
        .then((response) => {
          this.totalPages = response.data.total_pages;
          this.totalItems = response.data.total_results;
          this.movieList = response.data.results;

          this.isEmpty = this.movieList.length < 1;

          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },

    // Get Genre list from API
    getAllGenres() {
      axios.get(ApiFactory.Genres, {
        params: {
          api_key: ApiFactory.ApiKey,
        }
      })
        .then((response) => {
          this.genreList = response.data.genres;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Index of Items for each page
    pageIndex() {
      let start = (this.page - 1) * 20 + 1
      let end = this.totalItems

      if (this.isEmpty) {
        start = 0;
      }

      if (20 < this.totalItems) {
        end = 20 * this.page
        if (end > this.totalItems) {
          end = this.totalItems;
        }
      }

      return `${start}-${end}`
    }
  },

  mounted() {
    // Call Apis
    this.getAllMovies();
    this.getAllGenres();
  }
}
</script>

<style scoped>
.search-text {
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  margin-left: 81px;
  margin-right: 29px;
}

.search-btn {
  border-radius: 100px;
  background-color: #549DF2;
  color: #fff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-right: 62px;
}

.movie-list {
  margin-top: 119px;
  margin-bottom: 160px;
}

.paging {
  margin-bottom: 90px;
}

.text-disabled {
  color: #9d9d9d;
}
</style>
