var express = require('express');
var http=require('https');
var cors = require('cors');

var app = express();
var apiKey = '65a67da3dfc787dfb3774cf95aaaf64b';
const Month = {'01':'January','02':'February','03':'March','04':'April','05':'May','06':'June',
               '07':'July', '08':'August','09':'September','10':'October','11':'November','12':'December'}

app.use(cors());
// 顶层的搜索框
function searchMulti(name,httpres){
    var url ='https://api.themoviedb.org/3/search/multi?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&query=' + name;
    var result = new Array();
    var obj;
    http.get(url,function(req,res){
        var html='';
        console.log("已经发送请求");
        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data',function(data){
            html+=data;
        });
        //end事件
        req.on('end',function(){
            obj = JSON.parse(html);
            if(obj){
                for(var i = 0; i < obj.results.length && i < 7;i++){
                    var name = '';
                    if(!obj.results[i]) continue;
                    if(obj.results[i].media_type == 'tv'){
                        name = obj.results[i].name;
                    }else if(obj.results[i].media_type == 'movie'){
                        name = obj.results[i].title;
                    }
                    tmp={'id':obj.results[i].id,'name':name,'backdrop_path':'https://image.tmdb.org/t/p/w500'+obj.results[i].backdrop_path,'media_type':obj.results[i].media_type};
                    result[i] = tmp;
                }
            }
            httpres.json({res:result});
        });
    });
    console.log(result);
}

// 第一个轮播图
// https://api.themoviedb.org/3/movie/now_playing?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1
function search(httpres,baseurl,flag){
    var url =baseurl+'?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1' ;
    var result = new Array();
    var obj;
    http.get(url,function(req,res){
        var html='';
        console.log("已经发送请求");
        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data',function(data){
            html+=data;
        });
        //end事件
        req.on('end',function(){
            obj = JSON.parse(html);
            if(obj && obj.results){
                var j= 0;
                var end = (baseurl == 'https://api.themoviedb.org/3/movie/now_playing') ? 5 : obj.results.length;
                for(var i = 0;i < obj.results.length && j < end;i++){
                    if(!obj.results[i]) {continue;}
                    if(obj.results[i].backdrop_path){
                        var name = '';
                        if(flag){
                            name = obj.results[i].title;
                        }else{
                            name = obj.results[i].name;
                        }

                        tmp={'id':obj.results[i].id,'name':name,'media_type':obj.results[i].media_type};
                        if(baseurl != 'https://api.themoviedb.org/3/movie/now_playing'){
                            tmp['poster_path']='https://image.tmdb.org/t/p/w500'+obj.results[i].poster_path
                        }else{
                            tmp['backdrop_path']='https://image.tmdb.org/t/p/w500'+obj.results[i].backdrop_path
                        }
                        result[j] = tmp;
                        j++
                    }
                }
            }
            httpres.json({res:result});
        });
    });
}

// searchVideo
function searchVideo(httpres,baseurl,flag){
    var url =baseurl+'?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1' ;
    var result = {};
    var obj;
    console.log(url);
    http.get(url,function(req,res){
        var html='';
        console.log("已经发送请求");
        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data',function(data){
            html+=data;
        });
        //end事件

        req.on('end',function(){
            obj = JSON.parse(html);
            if(obj && obj.results){
                var i= 0;
                if(!obj.results[i]) { httpres.json({res:result}); return};
                if(obj.results[i] && obj.results[i].type){
                    result={'site':obj.results[i].site,'name':obj.results[i].name,'key':obj.results[i].key,'type':obj.results[i].type};
                }else{
                    result={'site':obj.results[i].site,'name':obj.results[i].name,'key':'tzkWB85ULJY','type':null};
                }
            }
            httpres.json({res:result});
        });
    });
}

// searchDetail
function searchDetail(httpres,baseurl,flag){
    var url =baseurl+'?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1' ;
    var result = {};
    var obj;
    console.log(url);
    http.get(url,function(req,res){
        var html='';
        console.log("已经发送请求");
        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data',function(data){
            html+=data;
        });
        //end事件
        req.on('end',function(){
            obj = JSON.parse(html);
            if(obj){
                result['name'] = obj.title;
                result['tagline'] = obj.tagline;
                result['vote_average'] = obj.vote_average;
                if(flag){
                    result['release_date'] = obj.release_date.substring(0,4);
                    result['runtime'] = obj.runtime >= 60? Math.floor(obj.runtime/60) + 'hrs ' + obj.runtime % 60 + 'mins' : obj.runtime + 'mins';
                }else{
                    result['release_date'] = obj.first_air_date.substring(0,4);
                    result['episode_run_time'] = obj.episode_run_time >= 60? Math.floor(obj.episode_run_time/60) + 'hrs ' + obj.episode_run_time % 60 + 'mins' : obj.runtime + 'mins';
                }

                result['overview'] = obj.overview;
                var genres = obj.genres[0].name;
                var spoken_languages = obj.spoken_languages[0].name;
                for(var i = 1 ; i < obj.genres.length; i++){
                    genres += ',' + obj.genres[i].name;
                }
                for(var j = 1 ; i < obj.spoken_languages.length; j++){
                    spoken_languages += ',' + obj.spoken_languages[j].name;
                }
                result['genres'] = genres;
                result['spoken_languages'] = spoken_languages;
            }
            httpres.json({res:result});
        });
    });
}

// searchReview
function searchReview(httpres,baseurl,flag){
    var url =baseurl+'?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1' ;
    var result = new Array();
    var obj;
    console.log(url);
    http.get(url,function(req,res){
        var html='';
        console.log("已经发送请求");
        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data',function(data){
            html+=data;
        });
        //end事件
        req.on('end',function(){
            obj = JSON.parse(html);
            if(obj && obj.results){
                var j= 0;
                for(var i = 0;i < obj.results.length && j < 10;i++){
                    tmp={'author':obj.results[i].author,'content':obj.results[i].content,'url':url};
                    var rating = obj.results[i].author_details.rating;
                    tmp['rating'] = rating? rating : 0;
                    var p = obj.results[i].author_details.avatar_path;
                    tmp['avatar_path'] = p ? (p.substring(0,7) == '/https:'? p.substring(1):'https://image.tmdb.org/t/p/original' + p):'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU';
                    var created_at = obj.results[i].created_at;

                    var year = created_at.substring(0,4);
                    var month = Month[created_at.substring(5,7)];
                    var day = created_at.substring(8,10);
                    var hour = Number(created_at.substring(11,13));
                    var suffix = hour >= 12? ' PM' : ' AM';
                    var Minute = created_at.substring(14,16);
                    var Second = created_at.substring(17,19);
                    tmp['created_at'] = month + ' ' + day + ',' + year + ', '+ hour + ':'+ Minute + ':' + Second + suffix
                    result[j] = tmp;
                    j++;
                }
            }
            httpres.json({res:result});
        });
    });
}

// searchCast
function searchCast(httpres,baseurl,flag){
    var url =baseurl+'?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1' ;
    var result = new Array();
    var obj;
    console.log(url);
    http.get(url,function(req,res){
        var html='';
        console.log("已经发送请求");
        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data',function(data){
            html+=data;
        });
        //end事件

        req.on('end',function(){
            obj = JSON.parse(html);
            if(obj && obj.cast){
                var j= 0;
                for(var i = 0;i < obj.cast.length;i++){
                    if(obj.cast[i].profile_path){
                        tmp={'id':obj.cast[i].id,'name':obj.cast[i].name,'character':obj.cast[i].character,'profile_path':'https://image.tmdb.org/t/p/w500'+obj.cast[i].profile_path};
                        result[j] = tmp;
                        j++;
                    }
                }
            }
            httpres.json({res:result});
        });
    });
}

// searchCastDetail
function searchCastDetail(httpres,baseurl,flag){
    var url =baseurl+'?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1' ;
    var result = {};
    var obj;
    console.log(url);
    http.get(url,function(req,res){
        var html='';
        console.log("已经发送请求");
        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data',function(data){
            html+=data;
        });
        //end事件
        req.on('end',function(){
            obj = JSON.parse(html);
            if(obj){
                result['birthday'] = obj.birthday;
                result['gender'] = obj.gender? (obj.gender == 1? 'female' : 'male'): 'undefined';
                result['name'] = obj.name;
                result['homepage'] = obj.homepage;
                result['also_known_as'] = obj.also_known_as.join(',');
                result['known_for_department'] = obj.known_for_department;
                result['biography'] = obj.biography;
                result['place_of_birth'] = obj.place_of_birth;
                result['profile_path'] = 'https://image.tmdb.org/t/p/w500'+obj.profile_path;
            }
            httpres.json({res:result});
        });
    });
}

// searchCastExternal
function searchCastExternal(httpres,baseurl,flag){
    var url =baseurl+'?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1' ;
    var result = {};
    var obj;
    console.log(url);
    http.get(url,function(req,res){
        var html='';
        console.log("已经发送请求");
        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data',function(data){
            html+=data;
        });
        //end事件
        req.on('end',function(){
            obj = JSON.parse(html);
            if(obj){
                result['imdb_id'] = obj.imdb_id ? 'https://www.imdb.com/name/' + obj.imdb_id : obj.imdb_id;
                result['facebook_id'] = obj.facebook_id ? 'https://www.facebook.com/' + obj.facebook_id : obj.facebook_id ;
                result['instagram_id'] = obj.instagram_id ? 'https://www.instagram.com/' + obj.instagram_id : obj.instagram_id ;
                result['twitter_id'] = obj.twitter_id ? 'https://www.twitter.com/' + obj.twitter_id : obj.twitter_id ;
            }
            httpres.json({res:result});
        });
    });
}

// 搜索框查询 http://localhost:8080/search?keyword=game
app.get('/search/', function (req, res) {
    try{
        searchMulti(req.query['keyword'],res);
    }catch (e){
        console.log(e);
    }
})

// 最上面的第一个轮播图推荐 5张电影图 http://localhost:8080/topmv/
app.get('/topmv/', function (req, res) {
    try{
        search(res,'https://api.themoviedb.org/3/movie/now_playing',true);
    }catch (e){
        console.log(e);
    }
})

// 高评分的电影轮播图 http://localhost:8080/topratemv/
app.get('/topratemv/', function (req, res) {
    try{
        search(res,'https://api.themoviedb.org/3/movie/top_rated',true)
    }catch(e){
        console.log(e);
    }

})
// 趋势电影轮播图 http://localhost:8080/trendmv/
app.get('/trendmv/', function (req, res) {
    try{
        search(res,'https://api.themoviedb.org/3/trending/movie/day',true)
    }catch (e){
        console.log(e);
    }

})
// 流行电影轮播图 http://localhost:8080/popularmv/
app.get('/popularmv/', function (req, res) {
    try{
        search(res,'https://api.themoviedb.org/3/movie/popular',true);
    }catch(e){
        console.log(e);
    }

})

// 根据一个电影的mvid来查找跟其相似的电影 http://localhost:8080/similarmv?id=399566
app.get('/similarmv/', function (req, res) {
    try{
        var mvid = req.query['id']
        var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid + '/similar';
        search(res,baseurl,true)
    }catch (e){
        console.log(e);
    }

})

// 根据一个电影的mvid来推荐电影 http://localhost:8080/recommendmv?id=399566
app.get('/recommendmv/', function (req, res) {
    try{
        var mvid = req.query['id'];
        var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid + '/recommendations';
        search(res,baseurl,true);
    }catch(e){
        console.log(e);
    }

})

// 根据一个mvid来查找电影信息，包括链接 http://localhost:8080/mv?id=464052
app.get('/mv/', function (req, res) {
    try{
            var mvid = req.query['id'];
            var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid + '/videos';
            searchVideo(res,baseurl,true);
    }catch(e){
        console.log(e);
    }

})

// 根据电影id来查找电影的细节 http://localhost:8080/mvdetails?id=464052
app.get('/mvdetails/', function (req, res) {
    try{
        var mvid = req.query['id']
        var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid;
        searchDetail(res,baseurl,true);
    }catch (e){
        console.log(e);
    }

})

// 根据电影id来查找电影的评论 http://localhost:8080/mvreviews?id=464052
app.get('/mvreviews/', function (req, res) {
    try{
        var mvid = req.query['id']
        var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid + '/reviews';
        searchReview(res,baseurl,true)
    }catch(e){
        console.log(e);
    }

})

// 根据电影id来查找cast http://localhost:8080/mvcast?id=464052
app.get('/mvcast/', function (req, res) {
    try{
        var mvid = req.query['id'];
        var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid + '/credits';
        searchCast(res,baseurl,true);
    }catch(e){
        console.log(e);
    }

})

// 高评分的电视轮播图 http://localhost:8080/topratetv/
app.get('/topratetv/', function (req, res) {
    try{
        search(res,'https://api.themoviedb.org/3/tv/top_rated',false)
    }catch(e){
        console.log(e);
    }

})

// 趋势电视轮播图 http://localhost:8080/trendtv/
app.get('/trendtv/', function (req, res) {
    try{
        search(res,'https://api.themoviedb.org/3/trending/tv/day',false);
    }catch{
        console.log(e);
    }
})
// 流行电视轮播图 http://localhost:8080/populartv/
app.get('/populartv/', function (req, res) {
    try{
        search(res,'https://api.themoviedb.org/3/tv/popular',false);
    }catch(e){
        console.log(e);
    }
})

// 根据一个电视的id来查找跟其相似的电影 http://localhost:8080/similartv?id=85271
app.get('/similartv/', function (req, res) {
    try{
        var tvid = req.query['id'];
        var baseurl = 'https://api.themoviedb.org/3/tv/' + tvid + '/similar';
        search(res,baseurl,false);
    }catch (e){
        console.log(e);
    }
})

// 根据一个电视的id来推荐电影 http://localhost:8080/recommendtv?id=85271
app.get('/recommendtv/', function (req, res) {
    try{
        var tvid = req.query['id']
        var baseurl = 'https://api.themoviedb.org/3/tv/' + tvid + '/recommendations';
        search(res,baseurl,false);
    }catch (e){
        console.log(e);
    }
})

// 根据一个tvid来查电视的视频，包括链接 http://localhost:8080/tv?id=85271
app.get('/tv/', function (req, res) {
    try{
        var tvid = req.query['id']
        var baseurl = 'https://api.themoviedb.org/3/tv/' + tvid + '/videos';
        searchVideo(res,baseurl,false);
    }catch(e){
        console.log(e);
    }

})

// 根据电视id来查找电视的细节 http://localhost:8080/tvdetails?id=85271
app.get('/tvdetails/', function (req, res) {
    try{
        var tvid = req.query['id']
        var baseurl = 'https://api.themoviedb.org/3/tv/' + tvid;
        searchDetail(res,baseurl,false);
    }catch(e){
        console.log(e);
    }

})

// 根据电视id来查找电视的评论 http://localhost:8080/tvreviews?id=85271
app.get('/tvreviews/', function (req, res) {
    try{
        var mvid = req.query['id']
        var baseurl = 'https://api.themoviedb.org/3/tv/' + mvid + '/reviews';
        searchReview(res,baseurl,true);
    }catch(e){
        console.log(e);
    }
})

// 根据电视id来查找cast http://localhost:8080/tvcast?id=85271
app.get('/tvcast/', function (req, res) {
    try{
        var tvid = req.query['id'];
        var baseurl = 'https://api.themoviedb.org/3/tv/' + tvid + '/credits';
        searchCast(res,baseurl,true);
    }catch(e){
        console.log(e);
    }
})

// 根据演员id来查找cast http://localhost:8080/castdetail?id=550843
app.get('/castdetail/', function (req, res) {
    try{
        var castid = req.query['id'];
        var baseurl = 'https://api.themoviedb.org/3/person/' + castid;
        searchCastDetail(res,baseurl,true);
    }catch(e){
        console.log(e);
    }
})

// 根据演员id来查找cast http://localhost:8080/castexternal?id=550843
app.get('/castexternal/', function (req, res) {
    try{
        var castid = req.query['id'];
        var baseurl = 'https://api.themoviedb.org/3/person/' + castid +'/external_ids';
        searchCastExternal(res,baseurl,true);
    }catch(e){
        console.log(e);
    }
})

const PORT = process.env.PORT || 8080;
// const PORT = 8080;
var server = app.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().port
})

module.exports = app;

