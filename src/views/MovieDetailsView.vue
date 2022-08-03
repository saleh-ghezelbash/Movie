<template>
    <div class="rounded-md flex items-center top-nav">
        <button @click="$router.push('/')" class="ml-9 px-3 py-2 hover:bg-sky-700 return-btn">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            <span class="ml-2">Back</span>
        </button>
        <div>

            <h1 class="font-normal movie-title">{{ !!movie.title ? movie.title : '--' }}</h1>
            <h3 class="mt-1.5 font-normal movie-subtitle">{{ !!movie.tagline ? movie.tagline : '--' }}</h3>
        </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-80">
        <Loading />
    </div>
    <div v-else>
        <div class="flex details">
            <div class="flex-none rounded-xl w-32 relative overflow-hidden image-wrapper">
                <img :src="`${apiFactory.ImageUrl}/${movie.poster_path}`" :alt="movie.title"
                    class="absolute inset-0 w-full h-full object-cover" loading="lazy" />                   
            </div>

            <div class="ml-16 mr-5 mt-6 w-full">
                <ul class="list-none">
                    <li class="flex justify-between items-center mb-4">
                        <span class="font-bold">Budget</span>
                        <span>${{ !!movie.budget ? movie.budget : '0' }}</span>
                    </li>
                    <li class="flex justify-between items-center mb-4">
                        <span class="font-bold">Revenue</span>
                        <span>${{ !!movie.revenue ? movie.revenue : '0' }}</span>
                    </li>
                    <li class="flex justify-between items-center mb-4">
                        <span class="font-bold">Release Date</span>
                        <span>{{ !!movie.release_date ? movie.release_date : '--' }}</span>
                    </li>
                    <li class="flex justify-between items-center mb-4">
                        <span class="font-bold">Runtime</span>
                        <span>{{ !!movie.runtime ? timeConvert(movie.runtime) : '--' }}</span>
                    </li>
                    <li class="flex justify-between items-center mb-4">
                        <span class="font-bold">Score</span>
                        <div class="flex items-center">
                            <dd class="w-36 bg-gray-200 rounded h-2.5 mr-2">
                                <div class="bg-blue-600 h-2.5 rounded"
                                    :style="{ width: (movie.vote_average * 10) + '%' }"></div>
                            </dd>
                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ !!movie.vote_average ?
                                    movie.vote_average.toFixed(2) : '0'
                            }}</span>
                        </div>
                    </li>
                    <li class="flex justify-between items-center mb-4">
                        <span class="font-bold">Genres</span>
                        <span>{{ GetGenreNames(movie.genres).join(' , ') }}</span>
                    </li>
                    <li class="flex justify-between items-center mb-4">
                        <span class="font-bold">IMDB Link</span>
                        <a :href="`https://www.imdb.com/title/${movie.imdb_id}/?ref_=hm_fanfav_tt_t_3_pd_fp1`"
                            target="_blank" class="underline text-sky-400">Link</a>
                    </li>
                    <li class="flex justify-between items-center mb-4">
                        <span class="font-bold">Homepage Link</span>
                        <a :href="movie.homepage" target="_blank" class="underline text-sky-400">Link</a>
                    </li>
                </ul>
            </div>
        </div>
        <p class="full-description">{{ movie.overview }}</p>

        <div class="mb-28 credit">
            <h3 class="credit-title">Credit:</h3>
            <p class="mt-3 credits">
                {{ credits.join(' , ') }}
            </p>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import { ApiFactory } from '@/api-factory.js';
import axios from 'axios';

export default {
    components: {
        Loading
    },

    data() {
        return {
            movie: {},
            credits: [],
            genreList: [],
            loading: false,
            apiFactory: ApiFactory
        }
    },

    methods: {
        // Get Name of genre object
        GetGenreNames(genres){
           return genres.map(m => m.name)
        },

        // Convert Time to new format string
        timeConvert(num) {
            var hours = Math.floor(num / 60);
            var minutes = num % 60;
            return hours + "h " + minutes + "m";
        },

        // Get Movie details from API
        getMovie(movieId) {
            this.loading = true;
            axios.get(`${this.apiFactory.Movie}/${movieId}`, {
                params: {
                    api_key: this.apiFactory.ApiKey,
                }
            })
                .then((response) => {
                    this.movie = response.data;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });
        },

        // Get Move Credits from API
        getMovieCredits(movieId) {
            axios.get(`${this.apiFactory.Movie}/${movieId}/credits`, {
                params: {
                    api_key: this.apiFactory.ApiKey,
                }
            })
                .then((response) => {
                    this.credits = response.data.cast
                        .sort((a, b) => (a.popularity < b.popularity) ? 1 : ((b.popularity < a.popularity) ? -1 : 0))
                        .map(m => m.original_name)
                        .slice(0, 10);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    created() {
        const movieId = this.$route.params.movie_id;

        // Call Apis
        this.getMovie(movieId);
        this.getMovieCredits(movieId);
    },
}
</script>

<style scoped>
.movie-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
}

.movie-subtitle {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
}

.return-btn {
    border-radius: 100px;
    background-color: #549DF2;
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-right: 62px;
}

.return-btn:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(3 105 161 / var(--tw-bg-opacity));
}

.details {
    margin-top: 78px;
}

.image-wrapper {
    width: 330px;
    height: 495px;
}

.full-description {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    margin-top: 53px;
    margin-bottom: 80px;
}

.credit-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
}

.credits {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
}
</style>