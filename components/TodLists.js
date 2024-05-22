import { useEffect, useState } from 'react';
import { Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box'
import { useDispatch, useSelector } from 'react-redux';
import { showData, updateStatus } from '../src/redux/reducers/crudSlice';
const TodLists = () => {

  const dispatch = useDispatch();

  const colorList = {
    colorDark: "#7A7777",
    colorWhite: "white"
  }

  const initialData = [
    {
      id: 1,
      task: "Do exercise",
      date: "6:00",
      status: false
    },
    {
      id: 2,
      task: "Buy Vegetables",
      date: "6:00",
      status: false
    },
    {
      id: 3,
      task: "Go To Shopping",
      date: "6:00",
      status: true,
    }
  ]
  const [todoList, setTodoList] = useState(initialData);
  const [isModal,setIsModal] = useState(true);

  const fetchUserData = () => {
    // dispatch(todoList);
    todoList && dispatch(showData(todoList));
  }

  const updateTodoList = (prevdata) => {
    // console.log(data);
    let updatedItem = {
      ...prevdata,
      status: !prevdata.status
    }
    // sending updated item to redux
    updatedItem && dispatch(updateStatus(updatedItem));
  }

  useEffect(() => {
    fetchUserData();
  }, [])
  const fetchReduxData = useSelector(({ crudSlice }) => crudSlice.reduxTodoList);
  return (


    <>

      <View style={styles.bodyArea}>
        <View style={styles.topheader}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../src/assets/left-arrow.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: '700' }}>TodoList</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../src/assets/three-dots-vertical.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#151515', flex: 1 }}>
          <View style={{ marginTop: 20, marginLeft: 20 }}>
            <Text style={{ color: 'white' }}>Today</Text>
            <Text style={{ fontSize: 14, color: '#7D7878' }}>March 4, 2010</Text>
          </View>

          {/* Todo 1 */}


          {
            fetchReduxData &&
            <FlatList
              data={fetchReduxData}
              renderItem={({ item }) => {
                return (
                  <View style={{ backgroundColor: '#201F1F', height: 50, alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                    <CheckBox
                      onClick={() => updateTodoList(item)}
                      leftText={"CheckBox"}
                      isChecked={item.status}
                      checkBoxColor={item.status ? colorList.colorWhite : colorList.colorDark}
                    />
                    <Text style={{ flex: 2, color: item.status ? colorList.colorWhite : colorList.colorDark, paddingLeft: 10, textDecorationLine: item.status ? 'none' : 'line-through', textDecorationStyle: 'solid', fontSize: 20 }}>{item.task}</Text>
                    <Text style={{ justifyContent: 'flex-end', color: item.status ? colorList.colorWhite : colorList.colorDark, fontSize: 15 }}>{item.date}</Text>
                  </View>

                )
              }}
            />
          }

        </View>
        <TouchableOpacity style={styles.circle} onPress={()=>setIsModal(true)}>
          <Image
            source={require('../src/assets/plus.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center', }}>
        <Modal visible={isModal} transparent>
          
          <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', alignItems: 'center' }} onPress={()=>setIsModal(false)}>
            {/* contentBox */}
            <View style={{ width: '100%', height: 300, backgroundColor: 'white', borderTopRightRadius:20,borderTopLeftRadius:20, alignItems: 'center',paddingTop:15 }}>
              <Image
              source={require('../src/assets/gap.png')}
              style={{width:'50%',borderRadius:250}}
              />
              <Text style={{color:'black',fontSize:25,fontWeight:'700',marginBottom:20,marginTop:40}}>Enter Your New Item</Text>
              <TextInput style={{borderColor:'black',borderWidth:1,width: "95%",borderRadius:250,paddingLeft:20,fontWeight:'600'}} placeholder='Enter Your Item' placeholderTextColor="grey" keyboardType='default' />
              <TouchableOpacity style={{backgroundColor:'black',width:'95%',height:60,borderRadius:250,justifyContent:'center',alignItems:'center',marginTop:20}}>
                <Text style={{fontSize:18,color:'white'}}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

    </>



  );
};
export default TodLists;

const styles = StyleSheet.create({
  topheader: {
    backgroundColor: '#0AB6AB',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bodyArea: {
    flex: 1,
    backgroundColor: 'black',
    // height:'100%'
  }, circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#0AB6AB',
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


