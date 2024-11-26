import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

export default function ToDoList() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");

  function saveHandler() {
    if (inputText.trim()) {
      // Boş girdileri engelle
      setList((prevList) => [
        ...prevList,
        { value: inputText, isComplete: false },
      ]);
      setInputText(""); // Ekledikten sonra TextInput'u temizle
    } else {
      alert("Boş metin eklenemez!");
    }
  }

  function listCompleteHandler(item) {
    const updatedList = list.map((listItem) =>
      listItem.value === item.value
        ? { ...listItem, isComplete: true }
        : listItem
    );
    setList(updatedList);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>YAPILACAKLAR</Text>
        <Text style={styles.title}>
          {list.reduce((acc, curr) => {
            return !curr.isComplete ? acc + 1 : acc;
          }, 0)}
        </Text>
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => listCompleteHandler(item)}>
              <View
                style={[
                  styles.listContainer,
                  item.isComplete && styles.completedText,
                ]}
              >
                <Text
                  style={[
                    styles.listText,
                    item.isComplete && styles.completedText,
                  ]}
                >
                  {item.value}
                </Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          style={styles.input}
          placeholder="Listele..."
        />
        <Pressable onPress={saveHandler}>
          <Text style={styles.btnInput}>Kaydet</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 60,
    paddingHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.40)",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  completedText: {
    textDecorationLine: "line-through", // Üzeri çizilecek stil
    backgroundColor: "rgba(100, 100, 100, 0.36)", // Tamamlanmış öğe arka plan rengi
  },
  titleContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  listContainer: {
    backgroundColor: "rgba(243, 207, 0, 0.53)",
    marginBottom: 5,
    borderRadius: 10,
  },
  listText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    fontWeight: "bold",
  },
  btnInput: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
  },

  title: {
    fontSize: 32,
    color: "rgb(230, 207, 4)",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    minWidth: "100%",
  },
});
