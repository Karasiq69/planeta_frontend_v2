// GenericSearchCombobox.tsx
import * as React from "react"
import {useState} from "react"
import {ChevronsUpDown} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import LoaderAnimated from "@/components/ui/LoaderAnimated";

interface SearchComboboxProps<T> {
    data?: { data: T[] }
    isLoading: boolean
    isPending: boolean
    onSearch: (value: string) => void
    onSelect: (item: T) => void
    getDisplayValue: (item: T) => string
    renderItem: (item: T) => React.ReactNode
    searchError?: string
    placeholder?: string
    width?: string
}

export function ComboboxSearch<T extends { id: number | string }>({
                                                                      data,
                                                                      isLoading,
                                                                      isPending,
                                                                      onSearch,
                                                                      onSelect,
                                                                      getDisplayValue,
                                                                      renderItem,
                                                                      searchError,
                                                                      placeholder = "Выберите...",
                                                                      width = "w-[400px]"
                                                                  }: SearchComboboxProps<T>) {
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<string | number>("")

    const handleSelectItem = (item: T) => {
        onSelect(item)

        // setSelectedItem(item.id)
        // setOpen(false)
    }
    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild disabled={isLoading}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`${width} justify-between`}
                >
                    {selectedItem
                        ? data?.data.find(item => item.id === selectedItem)
                            ? getDisplayValue(data.data.find(item => item.id === selectedItem)!)
                            : placeholder
                        : placeholder}
                    {isPending || isLoading ? <LoaderAnimated/> :<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>}
                </Button>
            </PopoverTrigger>

            <PopoverContent className={`${width} p-0`}>
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder={'Поиск..'}
                        onValueChange={onSearch}
                    />

                    {searchError && (
                        <p className="px-2 text-sm text-destructive">{searchError}</p>
                    )}

                    <CommandList>
                        {isLoading ? (
                            <CommandEmpty>Поиск...</CommandEmpty>
                        ) : data?.data?.length === 0 ? (
                            <CommandEmpty>Ничего не найдено</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {data?.data?.map((item) => (
                                    <CommandItem
                                        disabled={isPending}
                                        key={item.id}
                                        value={item.id.toString()}
                                        onSelect={() => handleSelectItem(item)}
                                    >
                                        {renderItem(item)}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}