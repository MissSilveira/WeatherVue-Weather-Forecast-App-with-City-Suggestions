const app = Vue.createApp({
    data() {
        return {
            location: '',
            country: '',
            localtime: '',
            temperature: '',
            sensation:'',
            wind: '',
            humidity: '',
            uv: '',
            condition: '',
            icon: '',
            valorDoInput: '',
            sugestoes: []
        };
    },
    methods: {
        obterValorDoInput() {
            let local = this.valorDoInput;
            let apiKey = '62396258f9d946c3a01185202231608';
            var apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${local}&aqi=no`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok!');
                    }
                    return response.json();
                })
                .then(data => {
                    const location = data.location;
                    const current = data.current;

                    this.location = location.name;
                    this.country = location.country;
                    this.localtime = location.localtime;
                    this.temperature = current.temp_c;
                    this.sensation = current.feelslike_c;
                    this.wind = current.wind_mph;
                    this.uv = current.uv;
                    this.humidity = current.humidity;
                    this.condition = current.condition.text;
                    this.icon = current.condition.icon;
                })
                .catch(error => {
                    console.log('errito', error);
                });
        },
        buscarSugestoes() {
            let valorInput = this.valorDoInput;
            if (valorInput.length >= 3) {
                let apiKey = '62396258f9d946c3a01185202231608';
                let apiUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${valorInput}`;
    
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok!');
                        }
                        return response.json();
                    })
                    .then(data => {
                        this.sugestoes = data;
                    })
                    .catch(error => {
                        console.log('Erro ao buscar sugestões', error);
                        this.sugestoes = [];
                    });
            } else {
                this.sugestoes = [];
            }
        },
        selecionarSugestao(sugestao) {
            this.valorDoInput = sugestao.name;
            this.sugestoes = [];
            this.obterDetalhesClima(sugestao); // Adicione esta linha para obter os detalhes do clima
        },
        obterDetalhesClima(sugestao) {
            let apiKey = '62396258f9d946c3a01185202231608';
            let apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${sugestao.name}`;
            
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok!');
                    }
                    return response.json();
                })
                .then(data => {
                    const location = data.location;
                    const current = data.current;
    
                    this.location = location.name;
                    this.country = location.country;
                    this.localtime = location.localtime;
                    this.temperature = current.temp_c;
                    this.sensation = current.feelslike_c;
                    this.uv = current.uv;
                    this.wind = current.wind_mph;
                    this.humidity = current.humidity;
                    this.condition = current.condition.text;
                    this.icon = current.condition.icon;
                })
                .catch(error => {
                    console.log('Erro ao obter detalhes do clima', error);
                });
        }
    }
});

app.mount('#app');
