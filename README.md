# What is this?

App where users can vote which Pokémon is the roundest. Used for playing w/ Next.js, tailwindcss, tRPC, Prisma.
# Notes taken while playing w/ this project

- WSL2 networking doesn't work very well out of the box: I had to:
    1. sudo ifconfig eth0 mtu 1350
    2. disable WSL's IPv6, from Windows control panel -> network connections -> WSL

    this is for sure related to my ISP.
- tRPC allows the FE to consume typesafe APIs, without schemas or code generation
- tRPC abstract these: API schema, service.
- the /api folder of NextJs lets you define an EP that returns on a lamba and returns a JSON
- Prisma uses a second, temporary database when you run migrations, (If you use a cloud-hosted database for development, you need to create the shadow database manually.)
- you should type React components with React.FC<>
- Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.
To use ISR add the revalidate prop to getStaticProps