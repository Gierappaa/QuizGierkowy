import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { isEqual, union } from 'lodash';
import gry from './listaGier.js';


const images = [
  require('../img/tenor.gif'),
  require('../img/ludzik.gif')
];


axios.defaults.baseURL = 'localhost:9001';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


const gierki = gry.map((e, i) => {

  return <div key={i}>
    <h1>{e.title}</h1>
    <h2>{e.company}</h2>
    <p>{e.bio}</p>
    {/* <img src={images[i]} alt=""/> */}
  </div>
})

//-------------------------------------------------------------------------------------sortowanie wieku

const dataAgeNice = union(gry.map((e) => {
  return e.age
})).sort((a, b) => a - b)

// console.log(dataAgeNice);

const dataAge = dataAgeNice.map((e, i) => {
  return <option key={i}>{e}</option>
})
//-------------------------------------------------------------------------------------sortowanie typu gry


const dataType = union(gry.map((e) => {
  return e.type
})).sort()

// console.log(dataType);

const dataTypeWrite = dataType.map((e, i) => {
  return <option key={i}>{e}</option>
})


//------------------------------------------------------------------------------------- Inicjacja Api

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputOption: "",
      inputOptionType: "",
      nameHidden: false,
      typeHidden: true,
      finalChoice: [],
      zwrotka: [],
      dataAgeApi: [],
      // optionSelectType: []
    }
  }

  // https://jsonplaceholder.typicode.com/users
  componentDidMount() {
    setTimeout(() => {
      axios({
        url: 'https://www.giantbomb.com/api/games/?api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&format=json',
        method: 'GET',
        format: 'json',
      })
        .then(response => {
          console.log(response.data);
          // const zwrotka = response.data;
          // this.setState({zwrotka})
        })
        .catch(err => {
          console.error(err);
        });
    }, 10)

    setTimeout(() => {
      axios({
        url: 'https://www.giantbomb.com/api/game_ratings/?api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&format=json&field_list=name',
        method: 'GET',
        format: 'json',
        crossdomain: true,
      })
        .then(response => {
          console.log("Segregacja względem wieku")
          console.log(response.data);
          const dataAgeApi = response.data.results;
          this.setState({ dataAgeApi })

        })
        .catch(err => {
          console.error(err);
        });
    }, 10)

    setTimeout(() => {
      axios({
        url: 'https://www.giantbomb.com/api/platforms/?api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&format=json&field_list=name',
        method: 'GET',
        format: 'json',
      })
        .then(response => {
          console.log("Segregacja względem platformy")
          console.log(response.data);

        })
        .catch(err => {
          console.error(err);
        });
    }, 10)

    setTimeout(() => {
      axios({
        url: 'https://www.giantbomb.com/api/themes/?api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&format=json&field_list=name',
        method: 'GET',
        format: 'json',
      })
        .then(response => {
          console.log("Segregacja względem tematyki")
          console.log(response.data);

        })
        .catch(err => {
          console.error(err);
        });
    }, 10)

    setTimeout(() => {
      axios({
        url: 'https://www.giantbomb.com/api/locations/?api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&format=json&field_list=name',
        method: 'GET',
        format: 'json',
      })
        .then(response => {
          console.log("Segregacja względem locations")
          console.log(response.data);

        })
        .catch(err => {
          console.error(err);
        });
    }, 10)

  }

  //-------------------------------------------------------------------------------------przypisywanie do statów

  handleChangeAge = e => {
    this.setState({
      inputOption: e.currentTarget.value,
      nameHidden: true,
      typeHidden: false
    })
    console.log("twój wiek: " + e.currentTarget.value)
  }



  handleChangeType = e => {
    this.setState({
      inputOptionType: e.currentTarget.value,
      typeHidden: true
    })
    console.log("twój typ gry: " + e.currentTarget.value)
  }

  componentDidUpdate() {
    let newInputOption = this.state.inputOption;
    let newInputOptionType = this.state.inputOptionType;

    // console.log(newInputOption);
    // console.log(newInputOptionType);

    const newGames = gry.filter((e, i) => {
      // console.log(e, e.inputOptionType);
      return e.age == newInputOption && e.type === newInputOptionType
    })
    if (!isEqual(this.state.finalChoice, newGames)) {
      this.setState({
        finalChoice: newGames
      })
    }
    console.log(this.state.finalChoice);
    // console.log(newGames);



    // const newGamesShow = newGames.map((e, i) => {

    //   return <div key={i}>
    //     <h1>{e.title}</h1>
    //     <h2>{e.company}</h2>
    //     <p>{e.bio}</p>
    //     {/* <img src={images[i]} alt=""/> */}
    //   </div>
    // })
  }




  render() {

    return (<>
      <p><strong>dobrze ze jestes</strong></p>



      <div hidden={this.state.nameHidden}>
        <h3>Wybierz swój wiek.</h3>
        <select style={{ background: "green" }} onChange={this.handleChangeAge} placeholder={"wiek"}>
          <option>Ile latek</option>
          {dataAge}
        </select>
      </div>


      <div hidden={this.state.typeHidden}>
        <h3>Wybierz typ gry w kórą chcesz zagrać.</h3>
        <select style={{ background: "red" }} onChange={this.handleChangeType} >
          <option>Jaki typ</option>
          {dataTypeWrite}
        </select> <br></br>
      </div>


      {this.state.finalChoice.map((e, i) => {
        return <div key={i}>
          <h1>{e.title}</h1>
          <h2>{e.company}</h2>
          <p>{e.bio}</p>
          {/* <img src={images[i]} alt=""/> */}
        </div>
      })}

      {/* {this.state.dataAgeApi.map((e,i) =>{
        return <div key= {i}>
        <h3>{e.name}</h3>
        </div>
      })}  */}
      <div style={{ height: "250px", width: "500px", backgroundColor: "black", backgroundImage: `url(${images[0]})` }}>
      </div>
      <div style={{ height: "250px", width: "500px", backgroundColor: "black", backgroundImage: `url(${images[1]})` }}>
      </div>
      {/* <div style={{ height: "1000px", width: "1000px", backgroundColor: "black", backgroundImage: `url(${obrazki[0]})` }}>
      </div> */}

      {/* <div style={{ height: "1000px", width: "1000px" }}>
        <img scr='{imgg}'></img>
        <img scr={images[0]}></img>
      </div> */}


      {/* <div style={{ height: "1000px", width: "1000px" }}>
        <img scr='{imgg}'></img>
        <img scr="url(${images[0]})"></img>
      </div> */}
    </>
    )
  }
}



document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <div>
      <App />
      {/* {gierki} */}


    </div>,
    document.getElementById('app')
  );
});

      // setTimeout(() => {
      //   axios({
      //     url: "https://api-v3.igdb.com/games",
      //     method: 'GET',

      //     headers: {
      //         'Accept': 'application/json',
      //         'user-key': 'a15532185a3ebfdfccf0c46118f28e77',
      //         "api_header": {
      //           "header": "Access-Control-Allow-Origin",
      //       }
      //     },
      //     data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
      //   })
      //     .then(response => {
      //         console.log(response.data);
      //     })
      //     .catch(err => {
      //         console.error(err);
      //     });
      //   }, 2000)


      // 564595a22fe0a85a71f47b1e8a6644fc66e80232

// const ApiKey = "564595a22fe0a85a71f47b1e8a6644fc66e80232";

        //    setTimeout(() => {
        // axios({
        //   url: "https://www.giantbomb.com/api/games/?api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232",
        //   method: 'GET',
        //   format : 'json',
        //   // data :
        // })
        //   .then(response => {
        //       console.log(response.data);
        //   })
        //   .catch(err => {
        //       console.error(err);
        //   });
        // }, 2000)