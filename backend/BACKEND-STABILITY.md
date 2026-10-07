# Backend stability patch

The API contract remains compatible with the redesigned Trendify frontend.

## Kept stable
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `POST /api/users/signup`
- `POST /api/users/login`
- `POST /api/users/forgot-password`
- `POST /api/users/reset-password`

## Small fixes
- Added missing `return` statements in signup/login so failed auth requests stop correctly.
- Avoided returning the password hash from signup.
- Added basic required-field validation.
- Added `/health` for deployment checks.
- Added error handling to `GET /products`.
- Added Mongoose `runValidators` to product updates.
- Made reset-token handling safer and single-save.
- Moved mail sender to `MAIL_FROM` with the previous sender as fallback.
- Added `.env.example`.

## What was intentionally not changed
No new order/payment database model or API was introduced. The current frontend stores cart data locally and does not call an order/payment backend endpoint, so changing that architecture would be unnecessary for the current UI redesign.
