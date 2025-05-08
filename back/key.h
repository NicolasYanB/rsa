#ifndef KEY_H
#define KEY_H

#include <emscripten.h>
#include "utils.h"

EMSCRIPTEN_KEEPALIVE
int generate_key(char str_p[], char str_q[], char str_e[]) {
  mpz_t p, q, e;
  // inicializa variáveis numericas
  mpz_init_set_str(p, str_p, 10);
  mpz_init_set_str(q, str_q, 10);
  mpz_init_set_str(e, str_e, 10);
  // verifica se p e q são primos
  if (!fermat_test(p, 10)) {
    perror("p não é primo");
    return -1;
  }
  if (!fermat_test(q, 10)) {
    perror("q não é primo");
    return -1;
  }
  // verifica se e é coprimo com (p-1)(q-1)
  mpz_t p_, q_, pq_, g;
  mpz_init(p_); // copia de p
  mpz_init(q_); // copia de q
  mpz_sub_ui(p_, p, 1);
  mpz_sub_ui(q_, q, 1);
  mpz_mul(pq_, p_, q_);
  gcd(g, e, pq_);
  if (mpz_cmp_ui(g, 1) != 0) {
    perror("e não é coprimo com (p-1)(q-1)");
    return -1;
  }
  mpz_clears(p_, q_, pq_, g, NULL);
  // gerando chave pública
  mpz_t n;
  mpz_init(n);
  mpz_mul(n, p, q);
  // salvando no arquivo
  FILE* f = fopen("chave_publica.txt", "w");
  mpz_out_str(f, 10, n);
  putc('\n', f);
  mpz_out_str(f, 10, e);
  mpz_clears(p, q, e, n, NULL);
  fclose(f);
  return 0;
}

#endif