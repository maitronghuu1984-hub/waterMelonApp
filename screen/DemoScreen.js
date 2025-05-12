import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function DemoScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  // Địa chỉ IP của máy chủ Flask
  const API_URL = "http://192.168.0.110:5000"; // Thay bằng IP của máy chủ

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Lưu URI của ảnh
    }
  };

  // Hàm gửi ảnh lên server Flask
  const sendImageToServer = async () => {
    if (!selectedImage) {
      Alert.alert("Lỗi", "Vui lòng chọn ảnh trước!");
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Cập nhật danh sách dự đoán
      if (response.data && response.data.predictions) {
        setPredictions(response.data.predictions);
      } else {
        Alert.alert("Thông báo", "Không có kết quả dự đoán nào!");
      }
    } catch (error) {
      console.error('Lỗi khi gửi ảnh lên server:', error);
      Alert.alert('Lỗi', 'Không thể gửi ảnh lên server. Vui lòng kiểm tra kết nối!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút chọn ảnh */}
      <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />
      
      {/* Hiển thị ảnh đã chọn */}
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Button title="Gửi ảnh lên server" onPress={sendImageToServer} />
        </>
      )}

      {/* Hiển thị danh sách kết quả dự đoán */}
      {predictions.length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Kết quả dự đoán:</Text>
          <FlatList
            data={predictions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text style={styles.resultText}>
                  {item.class}: {(item.confidence * 100).toFixed(2)}%
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
