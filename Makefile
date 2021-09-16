install:
	@echo "";
	@echo "Installing Application ...";
	@echo "";
	@docker-compose up -d --build;
	@echo "";
	@docker exec -it tweets yarn install;
	@echo "";

run:
	@echo "";
	@echo "Running the Application ...";
	@echo "";
	@docker exec -it tweets yarn start;

clean:
	@echo "";
	@echo "Cleaning the Application ...";
	@echo "";
	@docker-compose down --remove-orphans;
	@echo "";
	@docker system prune --all -f -a;
	@echo "";
