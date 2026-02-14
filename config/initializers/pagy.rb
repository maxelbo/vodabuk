Pagy::DEFAULT[:limit] = 50
Pagy::DEFAULT[:overflow] = :last_page
Pagy::DEFAULT[:size] = 5
Pagy::DEFAULT[:ends] = false

# Custom series
module PagyCompactSeries
  def series(*)
    return [] if @last.zero?
    return [(@page == 1 ? '1' : 1)] if @last == 1

    pages = [@page.to_s]

    # Prepend first page + gap if needed
    if @page > 3
      pages.unshift(:gap)
      pages.unshift(1)
    elsif @page == 3
      pages.unshift(2)
      pages.unshift(1)
    elsif @page == 2
      pages.unshift(1)
    end

    # Append gap + last page if needed
    if @page < @last - 2
      pages << :gap
      pages << @last
    elsif @page == @last - 2
      pages << (@last - 1)
      pages << @last
    elsif @page == @last - 1
      pages << @last
    end

    pages
  end
end
Pagy.prepend(PagyCompactSeries)
