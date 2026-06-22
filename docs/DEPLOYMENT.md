# Deploy de produção

Este guia publica o EcoDrive Tracker em:

```text
https://ecodrive.solutionforge.com.br
```

O Apache do AlmaLinux recebe as conexões HTTP/HTTPS e atua como proxy reverso
para o frontend Docker em `127.0.0.1:8085`. O JSON Server permanece acessível
somente pela rede interna do Docker.

## Arquitetura

```text
Internet
   |
Apache HTTP Server (80/443)
   |
127.0.0.1:8085
   |
Nginx + React ---- /api ---- JSON Server
                              |
                         volume Docker
```

## 1. Configurar o DNS

No provedor DNS do domínio `solutionforge.com.br`, crie o registro:

```text
Tipo: A
Nome: ecodrive
Destino: IP público da KVM
TTL: padrão
```

Confirme a propagação:

```bash
dig +short ecodrive.solutionforge.com.br
```

O comando deve retornar o IP público da KVM.

## 2. Instalar o projeto

Crie o diretório da aplicação:

```bash
sudo mkdir -p /var/www/solutionforge/ecodrive
sudo chown -R admin:admin /var/www/solutionforge/ecodrive
cd /var/www/solutionforge/ecodrive
```

Clone o repositório:

```bash
git clone https://github.com/Gerebabh/ecodrive-tracker-react.git .
git switch main
```

Suba os serviços:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Confira os contêineres:

```bash
docker compose -f docker-compose.prod.yml ps
docker stats --no-stream
```

Teste o frontend diretamente na KVM:

```bash
curl -I http://127.0.0.1:8085
```

## 3. Configurar o Apache

Verifique se os módulos necessários estão carregados:

```bash
sudo httpd -M | grep -E 'proxy_module|proxy_http_module'
```

Copie a configuração incluída no projeto:

```bash
sudo cp deploy/apache/080-ecodrive.conf /etc/httpd/conf.d/
```

Permita que o Apache se conecte ao frontend local:

```bash
sudo setsebool -P httpd_can_network_connect 1
```

Valide a configuração antes de recarregar:

```bash
sudo apachectl configtest
sudo systemctl reload httpd
```

Teste o endereço HTTP:

```bash
curl -I http://ecodrive.solutionforge.com.br
```

## 4. Ativar HTTPS

Confira se o Certbot está instalado:

```bash
certbot --version
```

Emita o certificado e configure o redirecionamento para HTTPS:

```bash
sudo certbot --apache -d ecodrive.solutionforge.com.br
```

Teste a renovação automática:

```bash
sudo certbot renew --dry-run
```

## 5. Atualizar a aplicação

Após publicar uma nova versão na branch `main`:

```bash
cd /var/www/solutionforge/ecodrive
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build
```

O volume `ecodrive-data` não é removido durante a atualização.

## 6. Backup do banco

Crie uma pasta para backups:

```bash
mkdir -p /var/www/solutionforge/ecodrive/backups
```

Copie o banco atual do contêiner:

```bash
docker cp ecodrive-api:/data/db.json \
  /var/www/solutionforge/ecodrive/backups/db-$(date +%Y%m%d-%H%M%S).json
```

Para restaurar um backup:

```bash
docker cp /caminho/do/backup.json ecodrive-api:/data/db.json
docker restart ecodrive-api
```

## 7. Comandos úteis

Visualizar os logs:

```bash
docker compose -f docker-compose.prod.yml logs -f
```

Reiniciar os serviços:

```bash
docker compose -f docker-compose.prod.yml restart
```

Parar os serviços sem remover o banco:

```bash
docker compose -f docker-compose.prod.yml down
```

Verificar a API por meio do frontend:

```bash
curl http://127.0.0.1:8085/api/veiculos
```

## Persistência

Na primeira inicialização, o conteúdo do `db.json` do repositório é copiado
para o volume `ecodrive-data`. Nas inicializações seguintes, o arquivo
persistente é preservado.

O comando `docker compose down` não remove o banco. Não utilize a opção
`--volumes` em produção, pois ela exclui o volume persistente.

## Segurança da demonstração

As operações de cadastro, edição e exclusão ficam disponíveis publicamente em
`/api`. Isso é útil para demonstrar o CRUD do portfólio, mas permite que
visitantes alterem os dados. Mantenha backups periódicos e restaure o banco
quando necessário.
