import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput, Button } from 'react-native';

const Ip=require('./Ipcim');


export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
    alkatreszgyarto:"",
    alkatresznev:"",
    alkatreszcikkszam:"",
    alkatreszar:"",
    kompmarka:"",
    komptipus:"",
    valaszto1:1,
    valaszto2:1,
    dataSource:[],
    dataSourcetipus:[],
    }

  }

  


  componentDidMount(){
      fetch(Ip.ipcim+'marka')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
      //tipus fetchelése

      fetch(Ip.ipcim+'tipus')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSourcetipus: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

kompmarka=()=>{
    //open(this.state.kompmarka)
}

komptipus=()=>{
  //open(this.state.komptipus)
}

feltoltes=()=>{ 
  if(this.state.alkatreszgyarto=="" && this.state.alkatresznev=="" && this.state.alkatreszcikkszam=="" && this.state.alkatreszar=="")
  alert("Minden mező kitöltése kötelező")
  else{

  
    //alert(this.state.valaszto2)

var bemenet={
    alkatreszgyarto:this.state.alkatreszgyarto,
    alkatresznev:this.state.alkatresznev,
    alkatreszcikkszam:this.state.alkatreszcikkszam,
    alkatreszar:this.state.alkatreszar,
    kompmarka:this.state.valaszto1,
    komptipus:this.state.valaszto2
    
  }

fetch(Ip.ipcim+'feltoltes', {
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }

)
.then(x => x.text())
.then(y => {
  alert(y)
  
}
);
  }
}

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 10}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:10}}>
          {/*-------------------------------------------------------------------------------------- keresés */}
          <Text style={{color:"Light", fontSize:15,marginLeft:20,marginTop:30}}>Alkatrész gyártója:</Text>
          <TextInput
        style={{color:"Light", fontSize:15,marginLeft:20,marginTop:10}}
        placeholder="Ide írj"

        onChangeText={(beirtszoveg)=>this.setState({alkatreszgyarto:beirtszoveg})}
        value={this.state.alkatreszgyarto}
      />
      <Text style={{color:"Light", fontSize:15,marginLeft:20,marginTop:30}}>Alkatrész megnevezése:</Text>
          <TextInput
        style={{color:"Light", fontSize:15,marginLeft:20,marginTop:10}}
        placeholder="Ide írj"

        onChangeText={(beirtszoveg)=>this.setState({alkatresznev:beirtszoveg})}
        value={this.state.alkatresznev}
      />
      <Text style={{color:"Light", fontSize:15,marginLeft:20,marginTop:30}}>Alkatrész cikkszáma:</Text>
          <TextInput
        style={{color:"Light", fontSize:15,marginLeft:20,marginTop:10}}
        placeholder="Ide írj"

        onChangeText={(beirtszoveg)=>this.setState({alkatreszcikkszam:beirtszoveg})}
        value={this.state.alkatreszcikkszam}
      />
      <Text style={{color:"Light", fontSize:15,marginLeft:20,marginTop:30}}>Alkatrész ára:</Text>
          <TextInput
        style={{color:"Light", fontSize:15,marginLeft:20,marginTop:10}}
        placeholder="Ide írj"

        onChangeText={(beirtszoveg)=>this.setState({alkatreszar:beirtszoveg})}
        value={this.state.alkatreszar}
      />
            <Text style={{color:"Light", fontSize:15,marginLeft:20,marginTop:20}}>Kompatibilis márka:</Text>
                <Picker 
                style={{marginLeft:12, marginBottom:10}}
                selectedValue={this.state.valaszto1}
                onValueChange={(ertek) => this.setState({valaszto1:ertek})


              }>
                  {this.state.dataSource.map(item=>

                <Picker.Item label={item.Auto_marka} value={item.marka_id} />
          )}

              </Picker>

              <Text style={{color:"Light", fontSize:15,marginLeft:20,marginTop:20}}>Kompatibilis tipus:</Text>
                <Picker 
                style={{marginLeft:12, marginBottom:10}}
                selectedValue={this.state.valaszto2}
                onValueChange={(ertek) => this.setState({valaszto2:ertek})


              }>
                  {this.state.dataSourcetipus.map(item=>

                <Picker.Item label={item.típus} value={item.autotipus_id} />
          )}

              </Picker>

     

     <View style={{height:40}}></View>

      <TouchableOpacity
        style={styles.kereses}
        onPress={ ()=>this.feltoltes()}

      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}>Feltöltés</Text>
      </TouchableOpacity>
  
              {/*------------------------------------------------------------------------------------------------- találatok*/}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    width:200,
    marginLeft:"auto",
    marginRight:"auto",
  },
  kereses:{
    alignItems: "center",
    backgroundColor: "darkblue",
    padding: 10,
    width:100,
    marginLeft:"auto",
    marginRight:"auto",
  }
 
})