<template>
    <div class="flex hover:shadow-xl cursor-pointer overflow-hidden movie-card" @click.native="goToMovie(movie.id)">
        <div class="flex-none w-32 relative overflow-hidden">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title"
                class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>

        <div class="flex flex-col justify-between p-4">
            <div class="flex flex-wrap h-14 overflow-hidden text-ellipsis">
                <h2 class="flex-auto text-slate-900 movie-title">
                    {{ movie.title }}
                </h2>
            </div>

            <div class="flex items-center">
                <font-awesome-icon icon="fa-regular fa-calendar" />
                <p class="ml-2">{{ movie.release_date }}</p>
            </div>

            <p class="h-10 text-ellipsis overflow-hidden genres movie-card-genre">
                {{ movieGenres(movie.genre_ids).join(' &#9679; ') }}
            </p>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        movie: Object,
        genreList: Array,
    },
    
    methods: {
        // Go to Movie page
        goToMovie(id) {
            this.$router.push(`/movie-details/${id}`);
        },

        // Find Name of Movie Genre
        movieGenres(movieGenreIds) {
            const genres = [];
            this.genreList.forEach(g => {
                movieGenreIds.forEach(m => {
                    if (m == g.id) {
                        genres.push(g.name);
                    }
                })
            });
            return genres
        }
    }
}
</script>

<style scoped>
.movie-card {
  height: 195px;
  background: #F1F1F1;
  border: 1px solid #C4C4C4;
  border-radius: 6px;
}

.movie-card-genre {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #505050;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.movie-title {
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>