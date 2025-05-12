#ifndef DECODE_H
#define DECODE_H

#include "utils.h"
#include <string.h>

EMSCRIPTEN_KEEPALIVE
int decode(char text[], char str_p[], char str_q[], char str_e[]) {
  mpz_t p, q, e, d, n;
  mpz_t p_, q_, pq_; // respectivamente: (p - 1), (q - 1) e (p - 1)(q - 1)
  // inicialização e atribuição de variáveis numericas
  mpz_init_set_str(p, str_p, 10);
  mpz_init_set_str(q, str_q, 10);
  mpz_init_set_str(e, str_e, 10);
  mpz_init(n);
  mpz_mul(n, p, q);
  mpz_init_set(p_, p);
  mpz_init_set(q_, q);
  mpz_init(pq_);
  mpz_sub_ui(p_, p_, 1);
  mpz_sub_ui(q_, q_, 1);
  mpz_mul(pq_, p_, q_);
  mpz_init(d);
  mpz_invert(d, e, pq_);
  // código para desencriptar
  FILE* f = fopen("decode.txt", "w");
  char *str_c = strtok(text, " ");
  char decoded_char;
  mpz_t c, res;
  mpz_init(res);
  mpz_init_set_str(c, str_c, 10);
  while (str_c != NULL) {
    mpz_powm(res, c, d, n);
    decoded_char = mpz_get_ui(res);
    putc(decoded_char, f);
    str_c = strtok(NULL, " ");
    if (str_c != NULL) mpz_set_str(c, str_c, 10);
  }
  fclose(f);
  mpz_clears(p, q, e, p_, q_, pq_, n, d, c, res, NULL);
  return 0;
}

#endif