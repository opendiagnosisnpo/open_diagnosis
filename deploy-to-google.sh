#!/usr/bin/env bash
gulp # or grunt?

gsutil -h "Cache-Control:public, max-age=2592000" cp -r -Z ./vendor gs://www.opendiagnosis.foundation/

gsutil -h "Cache-Control:public, max-age=2592000" cp -r -Z ./assets/css/*.min.css gs://www.opendiagnosis.foundation/assets/css/

gsutil -h "Cache-Control:public, max-age=2592000" cp -r -Z ./assets/scss/*.scss gs://www.opendiagnosis.foundation/assets/scss/

gsutil -h "Cache-Control:public, max-age=2592000" cp -r -Z ./assets gs://www.opendiagnosis.foundation/

gsutil -h "Cache-Control:public, max-age=2592000" cp -r -Z ./assets/img gs://www.opendiagnosis.foundation/

gsutil -h "Cache-Control:public, max-age=2592000" cp -Z ./index.html gs://www.opendiagnosis.foundation/

gsutil -h "Cache-Control:public, max-age=2592000" cp -Z ./coming_soon.html gs://www.opendiagnosis.foundation/

gsutil -h "Cache-Control:public, max-age=2592000" cp -Z ./nucleo-icons.html gs://www.opendiagnosis.foundation/

# gsutil -h "Cache-Control:public, max-age=2592000" cp -Z ./sitemap.xml gs://www.opendiagnosis.foundation/

gsutil iam ch allUsers:objectViewer gs://www.opendiagnosis.foundation/

