#ifndef ENCODE_H
#define ENCODE_H

#include "utils.h"

EMSCRIPTEN_KEEPALIVE
int encode(char text[], char str_n[], char str_e[], long long size) {
  mpz_t n, e;
  mpz_init_set_str(n, str_n, 10);
  mpz_init_set_str(e, str_e, 10);
  char *cache[94];
  for (int i = 0; i < 94; i++) cache[i] = 0;
  // encoding
  fclose(fopen("encode.txt", "w"));
  FILE* f = fopen("encode.txt", "w");
  mpz_t c, enc;
  mpz_init(c);
  mpz_init(enc);
  for (long long i = 0; i < size; i++) {
    if (text[i] < 32 || text[i] > 126) {
      continue;
    }
    mpz_set_ui(c, text[i]);
    if (cache[text[i]-32] == 0) {
      binpow_mod(c, e, n, enc);
      cache[text[i]-32] = mpz_get_str(NULL, 10, enc);
    } else {
      mpz_set_str(enc, cache[text[i]-32], 10);
    }
    mpz_out_str(f, 10, enc);
    if (i < size-1) {
      putc('-', f);
    }
  }
  fclose(f);
  mpz_clears(n, e, c, enc, NULL);
  return 0;
}

#endif