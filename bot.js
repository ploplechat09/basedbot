const Twit = require('twit');
const config = require('./config.js');
const tweetBot = new Twit(config);

const params = {
    q: '$based AND $Moonbase filter:media',
    count: 5,
    lang: 'en'
}

const favParams = {
    q: '$based OR $basedghouls',
    count: 5,
    lang: 'en'
}

tweetBot.get('search/tweets', params,  (err, data, res) => {
    if(!err){
        for(let i=0; i < data.statuses.length; i++){
            let tweetID = {id: data.statuses[i].id_str}
            tweetBot.post('statuses/retweet', tweetID, (err, res) => {
                if(!err){
                    console.log(`Retweet successful`)
                }else{
                    console.log(err.message)
                }
            })
        }
    }else{
        console.log(err) //comment
    }
})

tweetBot.get('search/tweets', favParams,  (err, data, res) => {
    if(!err){
        for(let i=0; i < data.statuses.length; i++){
            let tweetID = {id: data.statuses[i].id_str}
            tweetBot.post('favorites/create', tweetID, (err, res) => {
                if(!err){
                    console.log(`Favorite successful`)
                }else{
                    console.log(err.message)
                }
            })
        }
    }else{
        console.log(err)
    }
})
