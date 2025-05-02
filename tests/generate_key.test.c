#include "../back/key.h"

int main() {
  char p[101], q[101], e[101];
  scanf("%s %s %s", p, q, e);
  generate_key(p, q, e);
  return 0;
}