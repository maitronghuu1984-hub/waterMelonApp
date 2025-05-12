import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Text,
  Image,
  ScrollView,
  HStack,
  Pressable,
} from "native-base";
import { FontAwesome, AntDesign, FontAwesome6 } from "react-native-vector-icons";
import * as Linking from "expo-linking";

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <VStack space={8} backgroundColor="green.200">
       <Text padding={10} fontSize="2xl" fontWeight={"bold"} color={"blue.800"}>
         WATERMELON AI
        </Text>
      <Image
        source={require("../assets/images/giaodien.png")}
        alt={"Home Image"}
        width={"full"}
        height={"350"}
      />
      <VStack p={4} space={4}>
        {/* <Text fontSize="2xl" fontWeight={"bold"} color={"gray.900"}>
         HỆ THỐNG GIÁM SÁT IOT
        </Text>
        <Text fontSize="2xl" fontWeight={"bold"} color={"gray.900"}>
        TRỒNG CÂY RAU MÀU
        </Text> */}
       
        <ScrollView>
          <VStack alignItems={"stretch"} space={4}>
            {/* <MenuItem
              icon={
                <Ionicons name="images-outline" size={50} color={"#e11d48"} />
              }
              title={"Ảnh chụp cây lúa"}
              description={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              }
              onPress={() => navigation.navigate("Images")}
            /> */}
            <MenuItem
              icon={<FontAwesome name="image" size={50} color={"#059669"} />}
              title={"Upload ảnh cần nhận dạng"}
              description={"Tải ảnh và nhận dạng bệnh."}
              onPress={() => navigation.navigate("TestScreen")}
            />
            <MenuItem
              icon={<FontAwesome6 name="book" size={50} color={"green"} />}
              // onPress={() => navigation.navigate("Count")}

              onPress={() =>
                Linking.openURL(
                  "https://binhdien.com/dong-hanh-cung-nha-nong/chuong-trinh-canh-tac-thong-minh/ky-thuat-trong-va-cham-soc-dua-hau.html"
                )
              }
              title={"Cẩm nang trồng dưa hấu"}
              description={
                "Hướng dẫn kỹ thuật trồng dưa hấu."
              }
            />
            {/* <MenuItem
              icon={
                <FontAwesome
                  name="wechat"
                  size={50}
                  color={"#0284c7"}
                />
              }
              onPress={() =>
                Linking.openURL(
                  "https://console.dialogflow.com/api-client/demo/embedded/915c0b36-0713-495c-902a-f78939b7c24c"
                )
              }
              title={"ChatBot hỗ trợ nông dân"}
              description={"Giải đáp thắc mắc trong sản xuất dưa hấu."}
            /> */}
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
};

const MenuItem = ({ title, description, icon, onPress }) => (
  <Pressable
    backgroundColor={"white"}
    _pressed={{
      backgroundColor: "gray.200",
    }}
    rounded={10}
    onPress={onPress}
  >
    <HStack p={4} space={4} alignItems={"center"}>
      {icon}

      <VStack flexGrow={1} width={"1"}>
        <Text color={"#f97316"} fontSize="lg" fontWeight={"medium"}>
          {title}
        </Text>
        <Text fontSize="md">{description}</Text>
      </VStack>
    </HStack>
  </Pressable>
);
