class apifeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  filter() {
    const execludedQueries = ['sort', 'page', 'limitField', 'limit'];
    const filteredQueries = { ...this.querystr };
    execludedQueries.forEach((ele) => delete filteredQueries[ele]);
    console.log(filteredQueries);
    let stringQuery = JSON.stringify(filteredQueries);
    stringQuery = stringQuery.replace(
      /\b(lt|lte|gt|gte)\b/g,
      (val) => `$${val}`
    );
    this.query = this.query.find(JSON.parse(stringQuery));
    return this;
  }
  sort() {
    if (this.querystr.sort) {
      const sortedQuery = this.querystr.sort.split(',').join(' ').trim();
      this.query = this.query.sort(sortedQuery);
    }
    return this;
  }
  limitField() {
    if (this.querystr.limitField) {
      const limitedQuery = this.querystr.limitField.split(',').join(' ').trim();
      this.query = this.query.select(limitedQuery);
    }
    return this;
  }
  pagination() {
    const page = this.querystr.page * 1 || 1;
    const product = this.querystr.limit * 1 || 6;
    const pass = (page - 1) * product;
    this.query = this.query.skip(pass).limit(product);
    return this;
  }
}

module.exports = apifeatures;
