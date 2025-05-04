#include <stdio.h>
#include <gmp.h>

int main()
{
  mpz_t teste;
  mpz_init_set_str(teste, "902141295434895734957564148972452941989874834989347124792384891247985764674", 10);
  mpz_out_str(stdout, 10, teste);

  return 0;
}