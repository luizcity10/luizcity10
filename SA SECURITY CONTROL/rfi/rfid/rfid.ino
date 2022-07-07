#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <MFRC522.h>
 
#define SS_PIN 4  //D2
#define RST_PIN 5 //D1
#define LED_RED 0 //D3
#define LED_GREEN 2 //D4
 
using namespace std;
 
const char* ssid     = "ProTech";
const char* password = "12345678"; 

// Seu endereço de IP estático (será atribuido à placa)
IPAddress local_IP(192, 168, 43, 15);
// O endereço do gateway
IPAddress gateway(192, 168, 43, 1);

IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8);   //opcional
IPAddress secondaryDNS(8, 8, 4, 4); //opcional

String rfid_card = ""; //UID RFID obtido pelo Leitor
 
// Cria um objeto  MFRC522.
MFRC522 mfrc522(SS_PIN, RST_PIN);   
 
// Cria um objeto AsyncWebServer que usará a porta 80
AsyncWebServer server(80);
 
void notFound(AsyncWebServerRequest *request) {
  request->send(404, "text/plain", "Not found");
}
 
void setup() {
  Serial.begin(115200);
 
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, LOW);
 
  SPI.begin();
  mfrc522.PCD_Init();   // Inicia MFRC522

 // Configura o endereço IP estático
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("Falha ao configurar em modo Station (STA)");
  }
 
  // Conectando ao Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando WiFi..");
  }
 
  Serial.println(WiFi.localIP());
  //Rotas.
 
  server.on("/rfid", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", rfid_card.c_str());
    rfid_card = "";
  }); 

   // Adiciona no cabeçalho para evitar erro de acesso do CORS
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  server.onNotFound(notFound);
  // Inicia o serviço
  server.begin();
}

void leitura_rfid() {
  //Faça a leitura do ID do cartão
  if (mfrc522.PICC_ReadCardSerial()) {
    Serial.print("UID da tag :");
    String rfid_data = "";
    for (uint8_t i = 0; i < mfrc522.uid.size; i++)
    {
      Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
      Serial.print(mfrc522.uid.uidByte[i], HEX);
      rfid_data.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
      rfid_data.concat(String(mfrc522.uid.uidByte[i], HEX));
    }
    Serial.println();
    rfid_data.toUpperCase();
    rfid_card = rfid_data;
    
    
    if (rfid_data != " 76 C9 E4 48" ) {
      Serial.printf("Nenhum usuário encontrado\n");
      digitalWrite(LED_RED, HIGH);
    }
    else {
      Serial.printf("Usuário encontrado\n");
      digitalWrite(LED_GREEN, HIGH);
    }
    
    delay(1000);
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_RED, LOW);
    Serial.println();
  }
}



void loop() {
  // Procure por novos cartões.
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }else{ 
    leitura_rfid();
  }
  delay(200);  
}
