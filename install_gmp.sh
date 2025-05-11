mkdir gmp_inst
wget https://gmplib.org/download/gmp/gmp-6.3.0.tar.lz --directory-prefix=gmp_inst
cd gmp_inst
tar -xf gmp-6.3.0.tar.lz
cd gmp-6.3.0
emconfigure ./configure --disable-assembly --host none --enable-cxx --prefix=${HOME}/opt
make
make install
cd ../..
rm -rf gmp_inst