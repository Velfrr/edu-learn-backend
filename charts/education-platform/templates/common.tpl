{{- define "common.env" }}
- name: DB_HOST
  value: {{ .Values.database.host | quote }}
- name: DB_PORT
  value: {{ .Values.database.port | quote }}
- name: DB_USER
  valueFrom:
    secretKeyRef:
      name: {{ .Values.database.secretName }}
      key: user
- name: DB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {{ .Values.database.secretName }}
      key: password
- name: DB_NAME
  value: {{ .Values.database.name | quote }}
- name: JWT_SECRET
  valueFrom:
    secretKeyRef:
      name: {{ .Values.auth.secretName }}
      key: jwtSecret
- name: RABBITMQ_URL
  valueFrom:
    secretKeyRef:
      name: {{ .Values.rabbitmq.secretName }}
      key: url
{{- end }}
