export default {
  port: 1337,
  dbUri: "mongodb://localhost:27017/advance-backend",
  saltWorkFactor: 10,
  publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiTYVyKdrr0Ovzu8m9yAk
J+SDigp5KAisdCoXmU5FKZSyCKiCoKvvqHMZRGY/O13DAXvOHFYI5hji7pFUtImZ
wn5cf8IxCv7FC5hGATeCK0yrUhfjv/s2Fr5UxW1qDSieQ3wv2o/JVbGTgoX1T7Fo
57NLbdXBjhSlXPeAripxdznQ/sW6X9MQV/xK2g6n7/+Z8uUtUKdhWlSV3WqfS1U7
DqzOhkuSo1lbiFxYrPJFbErnmOS96IWpznk0AvPGPIq0amvC/3Y/gA0v+foFmOGq
TwrW+nmNPltfxgiB6m+oCTLUQUds7X5pLIdKxW2G3oau+cKz31sMxTCWjeJ8UyVY
zQIDAQAB
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAiTYVyKdrr0Ovzu8m9yAkJ+SDigp5KAisdCoXmU5FKZSyCKiC
oKvvqHMZRGY/O13DAXvOHFYI5hji7pFUtImZwn5cf8IxCv7FC5hGATeCK0yrUhfj
v/s2Fr5UxW1qDSieQ3wv2o/JVbGTgoX1T7Fo57NLbdXBjhSlXPeAripxdznQ/sW6
X9MQV/xK2g6n7/+Z8uUtUKdhWlSV3WqfS1U7DqzOhkuSo1lbiFxYrPJFbErnmOS9
6IWpznk0AvPGPIq0amvC/3Y/gA0v+foFmOGqTwrW+nmNPltfxgiB6m+oCTLUQUds
7X5pLIdKxW2G3oau+cKz31sMxTCWjeJ8UyVYzQIDAQABAoIBAH1RwamniAnmp184
PH1/hKZO5vkgQbIX4fKjMzSZMUAeCFEyH0TCZLyUi2JWhLAjHeVv/zsQNUZ7OmEs
qZHPD3l9Udx6L7LcKHpDlMStvxzvBJaRLTl+JtO0+NXs7eygyZPXjBlyNDApZRHU
ac5kuezNbDof/o1XPAViJMxuBX4fFOZxLqaFhpfQPzFacwJTzckm8NqOV5Ne6Y9w
xpWlVz5wrFRINvm7PlAK+QQRpkNUTPZ6Yiqtl17HnhnIwhNWD6PD1Z5mCmspxsZ+
KB0TsF2LCJ6wtUZsR4NWJBA9Z4iDKgWl0abLJq+IjAMsIiSmVvcSlqi7RNPOpOI7
ZX0Bbt0CgYEA9CdFc7D9S3YhIeNZnjwdLd5uOef0IjYmv0an26z771kNLQXXIOtX
EHxjsVeO6vwX1W2mH1z2y5TGRFO/c8mU1F7nuEqpuZJW//lEtPCpPJBy+0W4gg+F
sicsONUwTTnEhqiYGMZ6pra3/f+PLLI5U05A9RmPDa1Ur9kzH2m8+98CgYEAj95x
K3qm/hi8ySWKUscutULwLJJFOmde5xVPx9i4PyzIELaRUPIIPOBVUfM8UAusfEmN
oJSm1vQA2SxucxBh7QWPdIKvIzwghxHmyp1zvzEo9nwTYt7vsLopQjm+g+pgWp7J
5BmvPy7uwhWIcz2bywZYTs/HhCVfMY0nHb/WQNMCgYAMP8wkOcT7fDm9UYK1hZ6R
Jo+xKAn/jWf0QL87LjqVj4oxsBFS/XuowBTgWNw6vdsUQiQLfsaDADvSQcFhNcPZ
w8ksXdKWFNl4jjD8Qva6qySZpq3TGKREg+KcF1YNCdDqUJsQ4yRUKOaiP6gXPfnS
TCLGKTocHY4aJHOEJ/HrUQKBgDdPodrBcOpHwGzkzeU9RqvRbFz2bz8g9s+I1f9T
RqKjKNekGQIxyxD8flDfXtS3aDzwWk7eV7ZUYO8dsejy53MkrB5zD7pQJ4FGVKCZ
ICLlV4ZL9XgRlb0wFSSs5p34wcqVObFEXqe/93MOrEMB8J+BdPn30BDx/UMjrWI2
mryZAoGBAMqOF0jdEwVjdZO6xsfNigb6EoNadCG+nhSxNL9P+6CipV4Kgc5QMbaA
i3LihvpQVfxjZcfl5856DX1gtvz8E5W+trgDeTQ5WpA2WWKyBO1Rg2MNJosx8DbM
dPbxqxZBY28Z5yMi4aXzVLmbzsrahyqejWLJqein3BWOecjtumo9
-----END RSA PRIVATE KEY-----`,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
};