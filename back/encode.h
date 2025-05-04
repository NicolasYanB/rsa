#ifndef ENCODE_H
#define ENCODE_H

#include "utils.h"

int encode(char text[], char str_n[], char str_e[], long long size) {
  mpz_t n, e;
  mpz_init_set_str(n, str_n, 10);
  mpz_init_set_str(e, str_e, 10);
  // encoding
  FILE* f = fopen("encode.txt", "w");
  mpz_t c, enc;
  mpz_init(c);
  mpz_init(enc);
  for (long long i = 0; i < size; i++) {
    if (text[i] < 32 || text[i] > 126) {
      fprintf(stderr, "Caractere '%c', na posição %ld não é permitido!", text[i], i);
      return -1;
    }
    mpz_set_ui(c, text[i]);
    binpow_mod(c, e, n, enc);
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