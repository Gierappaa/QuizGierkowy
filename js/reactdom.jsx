import React from 'react';
import ReactDOM from 'react-dom';
import { isEqual, union } from 'lodash';
import gry from './listaGier.js';
import jsonp from 'jsonp';



const images = [
  require('../img/tenor.gif'),
  require('../img/ludzik.gif')
];

const gierki = gry.map((e, i) => {
  return <div key={i}>
    <h1>{e.title}</h1>
    <h2>{e.company}</h2>
    <p>{e.bio}</p>
  </div>
});

//-------------------------------------------------------------------------------------sortowanie wieku

const dataAgeNice = union(gry.map((e) => {
  return e.age
})).sort((a, b) => a - b);

// console.log(dataAgeNice);

const dataAge = dataAgeNice.map((e, i) => {
  return <option key={i}>{e}</option>
});
//-------------------------------------------------------------------------------------sortowanie typu gry


const dataType = union(gry.map((e) => {
  return e.type
})).sort();

const dataTypeWrite = dataType.map((e, i) => {
  return <option key={i}>{e}</option>
});

function getJsonpData(url) {
  return new Promise((resolve, reject) => jsonp(url, {
    param: 'json_callback'
  }, (err, data) => {
    console.log(err);
    console.log(data);

    if (err) {
      return reject(err);
    }

    return resolve(data);
  }))
}

//------------------------------------------------------------------------------------- Inicjacja Api

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOption: "",
      inputOptionType: "",
      nameHidden: false,
      typeHidden: true,
      finalChoice: [],
      dataAgeApi: [],
      apiResp: [],
    }
  }



  // https://jsonplaceholder.typicode.com/users
  componentDidMount() {
    setTimeout(() => {
      getJsonpData('https://www.giantbomb.com/api/games/?format=jsonp&api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232')
        .then(response => {
          // console.log(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }, 10);

    setTimeout(() => {
      getJsonpData('https://www.giantbomb.com/api/game_ratings/?format=jsonp&api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&field_list=name')
        .then(response => {
          // console.log("Segregacja względem wieku");
          // console.log(response.results);
          const respAgeApi = response.results;
          // console.log("wyniki wieku: " + respAgeApi)
          this.setState({ apiResp: respAgeApi })
        })
        .catch(err => {
          console.error(err);
        });
    }, 10);


    setTimeout(() => {
      getJsonpData('https://www.giantbomb.com/api/platforms/?format=jsonp&api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&field_list=name')
        .then(response => {
          // console.log("Segregacja względem platformy" );
          // console.log(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }, 10);

    setTimeout(() => {
      getJsonpData('https://www.giantbomb.com/api/themes/?format=jsonp&api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&field_list=name')
        .then(response => {
          // console.log("Segregacja względem tematyki");
          // console.log(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }, 10);

    setTimeout(() => {
      getJsonpData('https://www.giantbomb.com/api/search/?format=jsonp&api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232&query="Fallout"')
        .then(response => {
          // console.log("Segregacja względem types");
          console.log(response);
        })
        .catch(err => {
          console.error(err);
        });
    }, 10)


    const childrenAgeApi = this.state.dataAgeApi.filter(function (el) {
      return el.name == "ESRB: T";
    });
    // console.log(this.state.dataAgeApi + "tooooooooooooooooo")

  }

  //-------------------------------------------------------------------------------------przypisywanie do statów

  handleChangeAge = e => {
    this.setState({
      inputOption: e.currentTarget.value,
      nameHidden: true,
      typeHidden: false
    });
    console.log("twój wiek: " + e.currentTarget.value)
  };

  handleChangeType = e => {
    this.setState({
      inputOptionType: e.currentTarget.value,
      typeHidden: true
    });
    console.log("twój typ gry: " + e.currentTarget.value)
  };

  componentDidUpdate() {
    let newInputOption = this.state.inputOption;
    let newInputOptionType = this.state.inputOptionType;
    const newGames = gry.filter((e, i) => {
      return e.age == newInputOption && e.type === newInputOptionType
    });
    if (!isEqual(this.state.finalChoice, newGames)) {
      this.setState({
        finalChoice: newGames
      })
    }
    console.log(this.state.finalChoice);
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
          <option>Jaki typek</option>
          {dataTypeWrite}
        </select> <br></br>
      </div>



      {this.state.finalChoice.map((e, i) => {
        return <div key={i}>
          <h1>{e.title}</h1>
          <h2>{e.company}</h2>
          <p>{e.bio}</p>
        </div>
      })}

      {/* ---------------------------------------------------------------------------------------- wczytanie względem wieku */}
      {this.state.dataAgeApi.map((e, i) => {
        return <div key={i}>
          <h3>{e.name}</h3>
        </div>
      })}

      {/* <div style={{ height: "250px", width: "500px", backgroundColor: "black", backgroundImage: `url(${images[0]})` }}>
      </div>
      <div style={{ height: "250px", width: "500px", backgroundColor: "black", backgroundImage: `url(${images[1]})` }}>
      </div> */}


      {/* ---------------------------------------------------------------moje pierwsze podejscie do operowania na firebase */}
    <h1>tutaj zaczyna sie to co jest w bazie danych</h1>
    <input id="daneWejsciowe" type="text"/>
    
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
