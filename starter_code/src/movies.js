/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  // Create a deep copy of the movies object
  // by converting to and from JSON
  return JSON.parse(JSON.stringify(movies)).map(
    function(movie) {
      var minutes = 0

      // Split duration into components
      var split_duration = movie.duration.split(" ")

      // Parse each component...
      for (var i = 0; i < split_duration.length; i++) {
        var split_time = split_duration[i].split(/([0-9]+)([a-z]+)/).slice(1, -1)
        var time = {
          quantity: Number(split_time[0]),
          unit: split_time[1]
        }

        // ...and add duration to minutes
        switch (time.unit) {
        case "h":
          minutes += time.quantity * 60
          break
        case "min":
          minutes += time.quantity
          break
        default:
          throw "Unable to interpret " + time.unit + " in " + time + "!"
        }
      }

      // Update object
      movie.duration = minutes

      // Return object
      return movie
    }
  )
}



// Get the average of all rates with 2 decimals
var avgRate = function(total, rate, index, rates) {
  total += rate
  return (index === rates.length - 1) ? total / rates.length : total
}

function ratesAverage(movies) {
  return Number(movies.map(
    function(movie) { return Number(movie.rate) }
  ).reduce(avgRate).toFixed(2))
}

// Get the average of Drama Movies
function dramaMoviesRate(movies) {
  var dramaMovies = movies.filter(
    function(movie) { return movie.genre.includes("Drama") }
  )

  return dramaMovies.length > 0 ? ratesAverage(dramaMovies) : undefined
}

// Order by time duration, in growing order
function orderByDuration(movies) {
  return movies.sort(
    function(a, b) {
      if (a.duration < b.duration) {
        return -1
      }
      if (a.duration > b.duration) {
        return 1
      }

      // a.duration must be equal to b.duration
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }

      // should only happen with entries for the same movie
      return 0
    }
  )
}

// How many movies did STEVEN SPIELBERG
function howManyMovies(movies) {
  if (movies.length === 0) { return undefined }

  var spielbergMovies = movies.filter(
    function(movie) { return movie.director == "Steven Spielberg" && movie.genre.includes("Drama") }
  )

  return "Steven Spielberg directed " + spielbergMovies.length + " drama movies!"
}

// Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  var titles = movies.map(
    function(movie) { return movie.title }
  ).sort()

  return titles.length <= 20 ? titles : titles.slice(0, 20)
}

// Best yearly rate average
function bestYearAvg(movies) {
  if (movies.length === 0) { return undefined }

  var ratesByYear = movies.reduce(
    function(hash, movie) {
      if (!(movie.year in hash)) {
        hash[movie.year] = []
      }
      hash[movie.year].push(Number(movie.rate))
      return hash
    },
    {}
  )

  var avgRateByYear = []
  for (var year in ratesByYear) {
    avgRateByYear.push({
      year: year,
      avgRate: ratesByYear[year].reduce(avgRate)
    })
  }

  var best = avgRateByYear.sort(
    function(a, b) {
      // compare rates (descending)
      if (a.avgRate < b.avgRate) {
        return 1
      }
      if (a.avgRate > b.avgRate) {
        return -1
      }

      // a.avgRate must be equal to b.avgRate
      // compare years (ascending)
      if (a.year < b.year) {
        return -1
      }
      if (a.year > b.year) {
        return 1
      }

      // this shouldn't happen
      // (it requires a & b to be the same year)
      return 0
    }
  )[0]

  return "The best year was " + best.year + " with an average rate of " + best.avgRate
}
