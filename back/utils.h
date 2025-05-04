#ifndef UTILS_H
#define UTILS_H

#include <stdio.h>
#include <gmp.h>

void get_random_number(mpz_t out, mpz_t a) {
  /**
   * Parâmetros:
   *  out - big number de saída
   *  a - número base para a escolha do número aleaório
   * Retorno:
   *  Um número aleatório entre 2 e a - 2
   */
  gmp_randstate_t rand;
  mpz_t cmp;
  mpz_init_set(cmp, a);
  mpz_sub_ui(cmp, cmp, 1);
  gmp_randinit_default(rand);
  mpz_urandomm(out, rand, a);
  // O número aleatório precisa ser entre 2 e a - 2
  if (mpz_cmp_ui(out, 0) == 0) {
    mpz_add_ui(out, out, 2);
  } else if(mpz_cmp(out, cmp) == 0) {
    mpz_sub_ui(out, out, 1);
  }
  mpz_clear(cmp);
}

void binpow_mod(mpz_t a, mpz_t b, mpz_t m, mpz_t res) {
  /**
   * Algorítmo de exponenciação modular rápida
   * Parâmetros:
   *  a - base para a exponenciação
   *  b - expoente
   *  m - mod
   *  res - objeto de saída
   * Retorno:
   *  a^b mod m
   */
  mpz_t odd;
  mpz_t b_; // copia de b
  mpz_init_set(b_, b);
  mpz_init(odd);
  mpz_set_ui(res, 1);
  mpz_mod(a, a, m);
  while(mpz_cmp_ui(b_, 0) > 0) {
    mpz_mod_ui(odd, b_, 2);
    if (mpz_cmp_ui(odd, 0) != 0) {
      mpz_mul(res, res, a);
      mpz_mod(res, res, m);
    }
    mpz_mul(a, a, a);
    mpz_mod(a, a, m);
    mpz_div_ui(b_, b_, 2);
  }
  mpz_clear(odd);
}

int fermat_test(mpz_t p, int rounds) {
  /**
   * Teste de primalidade baseado no teorema de fermat
   * Parâmetros:
   *  p - número a ser testado
   *  rounds - quantidade de testes feitos com bases aleatórias
   * Retorno:
   *  1 se for primo 0 se não for primo, segundo o testo
   * OBS: Esse algorítmo não é um teste deterministico e sim probabilistico, logo propício a falsos positivos
   */
  if (mpz_cmp_ui(p, 4) < 0) {
    return mpz_cmp_ui(p, 2) == 0 || mpz_cmp_ui(p, 3) == 0;
  }

  mpz_t a, exp, pow;
  mpz_init(a);
  mpz_init(exp);
  mpz_init(pow);
  mpz_sub_ui(exp, p, 1);
  for (int i = 0; i < rounds; i++) {
    get_random_number(a, p);
    binpow_mod(a, exp, p, pow);
    if (mpz_cmp_ui(pow, 1) != 0) {
      mpz_clears(a, exp, pow, NULL);
      return 0;
    }
  }
  mpz_clears(a, exp, pow, NULL);
  return 1;
}

void gcd(mpz_t res, mpz_t a, mpz_t b) {
  /**
   * Calculo de mdc
   * Parâmetros:
   *  res - objeto de saída com o resultado
   *  a, b - números para o mdc
   */
  if (mpz_cmp(b, a) > 0) gcd(res, b, a);
  mpz_t mod;
  mpz_init(mod);
  mpz_mod(mod, a, b);
  if (mpz_cmp_ui(mod, 0) == 0) {
    mpz_set(res, b);
    mpz_clear(mod);
    return;
  }
  return gcd(res, b, mod);
}

#endif