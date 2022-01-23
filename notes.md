-WSL2 networking doesn't work very well out of the box: I had to:
    1.sudo ifconfig eth0 mtu 1350
    2.disable WSL's IPv6, from Windows control panel -> network connections -> WSL
this is for sure related to my ISP.
-tRPC allows the FE to consume typesafe APIs, whiout schemas or code generation
-tRPC abstract these: API schema, service.
-the /api folder of NextJs lets you define an EP that returns on a lamba and returns a JSON
