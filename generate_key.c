#include <stdio.h>
#include <gmp.h>

void get_random_number(mpz_t out, mpz_t a) {
  gmp_randstate_t rand;
  mpz_t cmp;
  mpz_init_set(cmp, a);
  mpz_sub_ui(cmp, cmp, 1);
  gmp_randinit_default(rand);
  mpz_urandomm(out, rand, a);
  if (mpz_cmp_ui(out, 0) == 0) {
    mpz_add_ui(out, out, 2);
  } else if(mpz_cmp(out, cmp) == 0) {
    mpz_sub_ui(out, out, 1);
  }
  mpz_clear(cmp);
}

void bignum_mod_binpow(mpz_t a, mpz_t b, mpz_t m, mpz_t res) {
  mpz_t odd;
  mpz_init(odd);
  mpz_init_set_ui(res, 1);
  mpz_mod(a, a, m);
  while(mpz_cmp_ui(b, 0) > 0) {
    mpz_mod_ui(odd, b, 2);
    if (mpz_cmp_ui(odd, 0) != 0) {
      mpz_mul(res, res, a);
      mpz_mod(res, res, m);
    }
    mpz_mul(a, a, a);
    mpz_mod(a, a, m);
    mpz_div_ui(b, b, 2);
  }
  mpz_clear(odd);
}

int fermat_test(mpz_t p, int rounds) {
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
    bignum_mod_binpow(a, exp, p, pow);
    if (mpz_cmp_ui(pow, 1) != 0) {
      return 0;
    }
  }
  return 1;
}

void gcd(mpz_t res, mpz_t a, mpz_t b) {
  if (mpz_cmp(b, a) > 0) gcd(res, b, a);
  mpz_t mod;
  mpz_init(mod);
  mpz_mod(mod, a, b);
  if (mpz_cmp_ui(mod, 0) == 0) {
    mpz_set(res, b);
    return;
  }
  return gcd(res, b, mod);
}

int main() {
  // char d[101], e[101];
  // scanf("%s", d);
  mpz_t a, b, res;
  mpz_init_set_ui(a, 938);
  mpz_init_set_ui(b, 446);
  mpz_init(res);
  gcd(res, a, b);
  mpz_out_str(stdout, 10, res);
  printf("\n");
  // mpz_t a, b, m, res;
  // mpz_init_set_ui(a, 2374859);
  // mpz_init_set_ui(b, 3029382);
  // mpz_init_set_ui(m, 36123);
  // mpz_init(res);
  // bignum_mod_binpow(a, b, m, res);
  // mpz_out_str(stdout, 10, res);
  // printf("%d\n", fermat_test(p, 10));
}