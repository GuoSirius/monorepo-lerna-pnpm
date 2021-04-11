var express = require('express')
var http = require('https')
var cors = require('cors')

var app = express()
var apiKey = '65a67da3dfc787dfb3774cf95aaaf64b'
app.use(cors())
// 顶层的搜索框
function searchMulti(name, httpres) {
  var url =
    'https://api.themoviedb.org/3/search/multi?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&query=' + name
  var result = new Array()
  var obj
  http.get(url, function(req, res) {
    var html = ''
    console.log('已经发送请求')
    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(data) {
      html += data
    })
    //end事件
    req.on('end', function() {
      obj = JSON.parse(html)
      if (obj) {
        for (var i = 0; i < obj.results.length && i < 7; i++) {
          var name = ''
          if (obj.results[i].media_type == 'tv') {
            name = obj.results[i].name
          } else if (obj.results[i].media_type == 'movie') {
            name = obj.results[i].title
          }
          tmp = {
            id: obj.results[i].id,
            name: name,
            backdrop_path: 'https://image.tmdb.org/t/p/w500' + obj.results[i].backdrop_path,
            media_type: obj.results[i].media_type
          }
          result[i] = tmp
        }
      }
      httpres.json({ res: result })
    })
  })
  console.log(result)
}

// 第一个轮播图
// https://api.themoviedb.org/3/movie/now_playing?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1
function search(httpres, baseurl, flag) {
  var url = baseurl + '?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1'
  var result = new Array()
  var obj
  http.get(url, function(req, res) {
    var html = ''
    console.log('已经发送请求')
    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(data) {
      html += data
    })
    //end事件
    req.on('end', function() {
      obj = JSON.parse(html)
      if (obj && obj.results) {
        var j = 0
        var end = baseurl == 'https://api.themoviedb.org/3/movie/now_playing' ? 5 : obj.results.length
        for (var i = 0; i < obj.results.length && j < end; i++) {
          if (obj.results[i].backdrop_path) {
            var name = ''
            if (flag) {
              name = obj.results[i].title
            } else {
              name = obj.results[i].name
            }
            tmp = {
              id: obj.results[i].id,
              name: name,
              backdrop_path: 'https://image.tmdb.org/t/p/w500' + obj.results[i].backdrop_path,
              media_type: obj.results[i].media_type
            }
            result[j] = tmp
            j++
          }
        }
      }
      httpres.json({ res: result })
    })
  })
}

//
function searchVideo(httpres, baseurl, flag) {
  var url = baseurl + '?api_key=65a67da3dfc787dfb3774cf95aaaf64b&language=en-US&page=1'
  var result = new Array()
  var obj
  console.log(url)
  http.get(url, function(req, res) {
    var html = ''
    console.log('已经发送请求')
    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(data) {
      html += data
    })
    //end事件

    req.on('end', function() {
      obj = JSON.parse(html)
      if (obj && obj.results) {
        var j = 0
        var end = baseurl == 'https://api.themoviedb.org/3/movie/now_playing' ? 5 : obj.results.length
        for (var i = 0; i < obj.results.length && j < end; i++) {
          tmp = {
            site: obj.results[i].site,
            name: obj.results[i].name,
            key: 'https://www.youtube.com/watch?v=' + obj.results[i].key,
            type: obj.results[i].type
          }
          result[j] = tmp
          j++
        }
      }
      httpres.json({ res: result })
    })
  })
}

// 搜索框查询 http://localhost:8080/search?keyword=game
app.get('/search/', function(req, res) {
  searchMulti(req.query['keyword'], res)
})

// 最上面的第一个轮播图推荐 5张电影图 http://localhost:8080/topmv/
app.get('/topmv/', function(req, res) {
  search(res, 'https://api.themoviedb.org/3/movie/now_playing', true)
})

// 高评分的电影轮播图 http://localhost:8080/topratemv/
app.get('/topratemv/', function(req, res) {
  search(res, 'https://api.themoviedb.org/3/movie/top_rated', true)
})
// 趋势电影轮播图 http://localhost:8080/trendmv/
app.get('/trendmv/', function(req, res) {
  search(res, 'https://api.themoviedb.org/3/trending/movie/day', true)
})
// 流行电影轮播图 http://localhost:8080/popularmv/
app.get('/popularmv/', function(req, res) {
  search(res, 'https://api.themoviedb.org/3/movie/popular', true)
})

// 根据一个电影的mvid来查找跟其相似的电影 http://localhost:8080/similarmv?id=399566
app.get('/similarmv/', function(req, res) {
  var mvid = req.query['id']
  var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid + '/similar'
  search(res, baseurl, true)
})

// 根据一个电影的mvid来推荐电影 http://localhost:8080/recommendmv?id=399566
app.get('/recommendmv/', function(req, res) {
  var mvid = req.query['id']
  var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid + '/recommendations'
  search(res, baseurl, true)
})

// 根据一个mvid来查找电影信息，包括链接 http://localhost:8080/mv?id=464052
app.get('/mv/', function(req, res) {
  var mvid = req.query['id']
  var baseurl = 'https://api.themoviedb.org/3/movie/' + mvid + '/videos'
  searchVideo(res, baseurl, true)
})

// 高评分的电视轮播图 http://localhost:8080/topratetv/
app.get('/topratetv/', function(req, res) {
  search(res, 'https://api.themoviedb.org/3/tv/top_rated', false)
})

// 趋势电视轮播图 http://localhost:8080/trendtv/
app.get('/trendtv/', function(req, res) {
  search(res, 'https://api.themoviedb.org/3/trending/tv/day', false)
})
// 流行电视轮播图 http://localhost:8080/populartv/
app.get('/populartv/', function(req, res) {
  search(res, 'https://api.themoviedb.org/3/tv/popular', false)
})

// 根据一个电视的id来查找跟其相似的电影 http://localhost:8080/similartv?id=85271
app.get('/similartv/', function(req, res) {
  var tvid = req.query['id']
  var baseurl = 'https://api.themoviedb.org/3/tv/' + tvid + '/similar'
  search(res, baseurl, false)
})

// 根据一个电视的id来推荐电影 http://localhost:8080/recommendtv?id=85271
app.get('/recommendtv/', function(req, res) {
  var tvid = req.query['id']
  var baseurl = 'https://api.themoviedb.org/3/tv/' + tvid + '/recommendations'
  search(res, baseurl, false)
})

// 根据一个tvid来查找电影信息，包括链接 http://localhost:8080/tv?id=85271
app.get('/tv/', function(req, res) {
  var tvid = req.query['id']
  var baseurl = 'https://api.themoviedb.org/3/tv/' + tvid + '/videos'
  searchVideo(res, baseurl, false)
})

const PORT = process.env.PORT || 3000
// const PORT = 8080;
var server = app.listen(PORT, function() {
  var host = server.address().address
  var port = server.address().port
})

module.exports = app
