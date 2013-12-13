default: data
	@cd $< && git pull && bundle && bundle exec rake dist
	@cp -f $</dist/ember* .
	@du -bh ember*

data:
	@git clone https://github.com/emberjs/data.git $@

.PHONY: default