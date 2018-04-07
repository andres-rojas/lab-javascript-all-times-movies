/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  // Create a deep copy of the movies object
  // by converting to and from JSON
  return JSON.parse(JSON.stringify(movies)).map(
    function(movie) {
      minutes = 0

      // Split duration into components
      split_duration = movie.duration.split(" ")

      // Parse each component...
      for (var i = 0; i < split_duration.length; i++) {
        split_time = split_duration[i].split(/([0-9]+)([a-z]+)/).slice(1, -1)
        time = {
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
function ratesAverage(movies) {
  return movies.map(
    function(movie) { return Number(movie.rate) }
  ).reduce(
    function(total, rate, index, rates) {
      total += rate
      if (index === rates.length - 1) {
        return Number((total / rates.length).toFixed(2))
      } else {
        return total
      }
    }
  )
}

// Get the average of Drama Movies
function dramaMoviesRate(movies) {
  dramaMovies = movies.filter(
    function(movie) { return movie.genre.includes("Drama") }
  )

  return dramaMovies.length > 0 ? ratesAverage(dramaMovies) : undefined
}

// Order by time duration, in growing order


// How many movies did STEVEN SPIELBERG


// Order by title and print the first 20 titles


// Best yearly rate average
