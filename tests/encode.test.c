#include "../back/encode.h"
#include <string.h>

int main () {
  char txt[1000];
  char n[1000];
  char e[101];
  int s;
  fgets(txt, 1000, stdin);
  s = strlen(txt);
  FILE* f = fopen("chave_publica.txt", "r");
  fgets(n, 1000, f);
  fgets(e, 100, f);
  fclose(f);
  encode(txt, n, e, s);
  return 0;
}