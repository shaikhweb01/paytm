FROM node:20.19-alpine


WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json  ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install
# Can you add a script to the global package.json that does this?

# 4️⃣ Prisma generate (path must exist now)
RUN npx prisma generate --schema=packages/orm/prisma/schema.prisma



# Can you filter the build down to just one app?
RUN npm run build

CMD ["npm", "run", "start-user-app"]