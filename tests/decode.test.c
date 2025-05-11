#include "../back/decode.h"

int main() {
  char decoded[100];
  scanf("%s", decoded);
  decode(decoded, "101", "103", "7");
  return 0;
}