#!/usr/bin/env bash
gulp production

gsutil -m -h "Cache-Control:public, max-age=2592000" cp -r -Z ./production/* gs://opendiagnosis.foundation/

gsutil iam ch allUsers:objectViewer gs://opendiagnosis.foundation/
