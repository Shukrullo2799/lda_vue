// components.d.ts
declare module "vue" {
  export interface GlobalComponents {
    // ===== Button =====
    Button: (typeof import("./src/components/ui/button/Button.vue"))["default"]

    // ===== Input =====
    Input: (typeof import("./src/components/ui/input/Input.vue"))["default"]

    // ===== Select =====
    Select: (typeof import("./src/components/ui/select/Select.vue"))["default"]
    SelectTrigger: (typeof import("./src/components/ui/select/SelectTrigger.vue"))["default"]
    SelectContent: (typeof import("./src/components/ui/select/SelectContent.vue"))["default"]
    SelectGroup: (typeof import("./src/components/ui/select/SelectGroup.vue"))["default"]
    SelectItem: (typeof import("./src/components/ui/select/SelectItem.vue"))["default"]
    SelectLabel: (typeof import("./src/components/ui/select/SelectLabel.vue"))["default"]
    SelectSeparator: (typeof import("./src/components/ui/select/SelectSeparator.vue"))["default"]
    SelectValue: (typeof import("./src/components/ui/select/SelectValue.vue"))["default"]

    // ===== Dialog =====
    Dialog: (typeof import("./src/components/ui/dialog/Dialog.vue"))["default"]
    DialogTrigger: (typeof import("./src/components/ui/dialog/DialogTrigger.vue"))["default"]
    DialogContent: (typeof import("./src/components/ui/dialog/DialogContent.vue"))["default"]
    DialogHeader: (typeof import("./src/components/ui/dialog/DialogHeader.vue"))["default"]
    DialogTitle: (typeof import("./src/components/ui/dialog/DialogTitle.vue"))["default"]
    DialogDescription: (typeof import("./src/components/ui/dialog/DialogDescription.vue"))["default"]
    DialogFooter: (typeof import("./src/components/ui/dialog/DialogFooter.vue"))["default"]
    DialogClose: (typeof import("./src/components/ui/dialog/DialogClose.vue"))["default"]
    DialogOverlay: (typeof import("./src/components/ui/dialog/DialogOverlay.vue"))["default"]
    DialogScrollContent: (typeof import("./src/components/ui/dialog/DialogScrollContent.vue"))["default"]

    // ===== Tabs =====
    Tabs: (typeof import("./src/components/ui/tabs/Tabs.vue"))["default"]
    TabsList: (typeof import("./src/components/ui/tabs/TabsList.vue"))["default"]
    TabsTrigger: (typeof import("./src/components/ui/tabs/TabsTrigger.vue"))["default"]
    TabsContent: (typeof import("./src/components/ui/tabs/TabsContent.vue"))["default"]

    // ===== Dropdown Menu =====
    DropdownMenu: (typeof import("./src/components/ui/dropdown-menu/DropdownMenu.vue"))["default"]
    DropdownMenuTrigger: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuTrigger.vue"))["default"]
    DropdownMenuContent: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuContent.vue"))["default"]
    DropdownMenuItem: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuItem.vue"))["default"]
    DropdownMenuLabel: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuLabel.vue"))["default"]
    DropdownMenuSeparator: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuSeparator.vue"))["default"]
    DropdownMenuGroup: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuGroup.vue"))["default"]
    DropdownMenuCheckboxItem: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue"))["default"]
    DropdownMenuRadioGroup: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue"))["default"]
    DropdownMenuRadioItem: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuRadioItem.vue"))["default"]
    DropdownMenuSub: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuSub.vue"))["default"]
    DropdownMenuSubTrigger: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue"))["default"]
    DropdownMenuSubContent: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuSubContent.vue"))["default"]
    DropdownMenuShortcut: (typeof import("./src/components/ui/dropdown-menu/DropdownMenuShortcut.vue"))["default"]

    // ===== Tooltip =====
    Tooltip: (typeof import("./src/components/ui/tooltip/Tooltip.vue"))["default"]
    TooltipTrigger: (typeof import("./src/components/ui/tooltip/TooltipTrigger.vue"))["default"]
    TooltipContent: (typeof import("./src/components/ui/tooltip/TooltipContent.vue"))["default"]
    TooltipProvider: (typeof import("./src/components/ui/tooltip/TooltipProvider.vue"))["default"]

    // ===== Avatar =====
    Avatar: (typeof import("./src/components/ui/avatar/Avatar.vue"))["default"]
    AvatarImage: (typeof import("./src/components/ui/avatar/AvatarImage.vue"))["default"]
    AvatarFallback: (typeof import("./src/components/ui/avatar/AvatarFallback.vue"))["default"]

    // ===== Checkbox =====
    Checkbox: (typeof import("./src/components/ui/checkbox/Checkbox.vue"))["default"]

    // ===== Radio Group =====
    RadioGroup: (typeof import("./src/components/ui/radio-group/RadioGroup.vue"))["default"]
    RadioGroupItem: (typeof import("./src/components/ui/radio-group/RadioGroupItem.vue"))["default"]

    // ===== Table =====
    Table: (typeof import("./src/components/ui/table/Table.vue"))["default"]
    TableHeader: (typeof import("./src/components/ui/table/TableHeader.vue"))["default"]
    TableBody: (typeof import("./src/components/ui/table/TableBody.vue"))["default"]
    TableFooter: (typeof import("./src/components/ui/table/TableFooter.vue"))["default"]
    TableHead: (typeof import("./src/components/ui/table/TableHead.vue"))["default"]
    TableRow: (typeof import("./src/components/ui/table/TableRow.vue"))["default"]
    TableCell: (typeof import("./src/components/ui/table/TableCell.vue"))["default"]
    TableCaption: (typeof import("./src/components/ui/table/TableCaption.vue"))["default"]
    TableEmpty: (typeof import("./src/components/ui/table/TableEmpty.vue"))["default"]

    // ===== Breadcrumb =====
    Breadcrumb: (typeof import("./src/components/ui/breadcrumb/Breadcrumb.vue"))["default"]
    BreadcrumbList: (typeof import("./src/components/ui/breadcrumb/BreadcrumbList.vue"))["default"]
    BreadcrumbItem: (typeof import("./src/components/ui/breadcrumb/BreadcrumbItem.vue"))["default"]
    BreadcrumbLink: (typeof import("./src/components/ui/breadcrumb/BreadcrumbLink.vue"))["default"]
    BreadcrumbPage: (typeof import("./src/components/ui/breadcrumb/BreadcrumbPage.vue"))["default"]
    BreadcrumbSeparator: (typeof import("./src/components/ui/breadcrumb/BreadcrumbSeparator.vue"))["default"]
    BreadcrumbEllipsis: (typeof import("./src/components/ui/breadcrumb/BreadcrumbEllipsis.vue"))["default"]

    // ===== Calendar =====
    Calendar: (typeof import("./src/components/ui/calendar/Calendar.vue"))["default"]
    CalendarGrid: (typeof import("./src/components/ui/calendar/CalendarGrid.vue"))["default"]
    CalendarGridHead: (typeof import("./src/components/ui/calendar/CalendarGridHead.vue"))["default"]
    CalendarGridBody: (typeof import("./src/components/ui/calendar/CalendarGridBody.vue"))["default"]
    CalendarGridRow: (typeof import("./src/components/ui/calendar/CalendarGridRow.vue"))["default"]
    CalendarHeadCell: (typeof import("./src/components/ui/calendar/CalendarHeadCell.vue"))["default"]
    CalendarHeader: (typeof import("./src/components/ui/calendar/CalendarHeader.vue"))["default"]
    CalendarHeading: (typeof import("./src/components/ui/calendar/CalendarHeading.vue"))["default"]
    CalendarCell: (typeof import("./src/components/ui/calendar/CalendarCell.vue"))["default"]
    CalendarCellTrigger: (typeof import("./src/components/ui/calendar/CalendarCellTrigger.vue"))["default"]
    CalendarNextButton: (typeof import("./src/components/ui/calendar/CalendarNextButton.vue"))["default"]
    CalendarPrevButton: (typeof import("./src/components/ui/calendar/CalendarPrevButton.vue"))["default"]

    // ===== Pagination =====
    Pagination: (typeof import("./src/components/ui/pagination/Pagination.vue"))["default"]
    PaginationContent: (typeof import("./src/components/ui/pagination/PaginationContent.vue"))["default"]
    PaginationItem: (typeof import("./src/components/ui/pagination/PaginationItem.vue"))["default"]
    PaginationFirst: (typeof import("./src/components/ui/pagination/PaginationFirst.vue"))["default"]
    PaginationPrevious: (typeof import("./src/components/ui/pagination/PaginationPrevious.vue"))["default"]
    PaginationNext: (typeof import("./src/components/ui/pagination/PaginationNext.vue"))["default"]
    PaginationLast: (typeof import("./src/components/ui/pagination/PaginationLast.vue"))["default"]
    PaginationEllipsis: (typeof import("./src/components/ui/pagination/PaginationEllipsis.vue"))["default"]

    // ===== Popover =====
    Popover: (typeof import("./src/components/ui/popover/Popover.vue"))["default"]
    PopoverTrigger: (typeof import("./src/components/ui/popover/PopoverTrigger.vue"))["default"]
    PopoverContent: (typeof import("./src/components/ui/popover/PopoverContent.vue"))["default"]
    PopoverAnchor: (typeof import("./src/components/ui/popover/PopoverAnchor.vue"))["default"]

    // ===== Sheet =====
    Sheet: (typeof import("./src/components/ui/sheet/Sheet.vue"))["default"]
    SheetTrigger: (typeof import("./src/components/ui/sheet/SheetTrigger.vue"))["default"]
    SheetContent: (typeof import("./src/components/ui/sheet/SheetContent.vue"))["default"]
    SheetHeader: (typeof import("./src/components/ui/sheet/SheetHeader.vue"))["default"]
    SheetTitle: (typeof import("./src/components/ui/sheet/SheetTitle.vue"))["default"]
    SheetDescription: (typeof import("./src/components/ui/sheet/SheetDescription.vue"))["default"]
    SheetFooter: (typeof import("./src/components/ui/sheet/SheetFooter.vue"))["default"]
    SheetClose: (typeof import("./src/components/ui/sheet/SheetClose.vue"))["default"]
    SheetOverlay: (typeof import("./src/components/ui/sheet/SheetOverlay.vue"))["default"]

    // ===== Sidebar =====
    Sidebar: (typeof import("./src/components/ui/sidebar/Sidebar.vue"))["default"]
    SidebarContent: (typeof import("./src/components/ui/sidebar/SidebarContent.vue"))["default"]
    SidebarFooter: (typeof import("./src/components/ui/sidebar/SidebarFooter.vue"))["default"]
    SidebarGroup: (typeof import("./src/components/ui/sidebar/SidebarGroup.vue"))["default"]
    SidebarGroupAction: (typeof import("./src/components/ui/sidebar/SidebarGroupAction.vue"))["default"]
    SidebarGroupContent: (typeof import("./src/components/ui/sidebar/SidebarGroupContent.vue"))["default"]
    SidebarGroupLabel: (typeof import("./src/components/ui/sidebar/SidebarGroupLabel.vue"))["default"]
    SidebarHeader: (typeof import("./src/components/ui/sidebar/SidebarHeader.vue"))["default"]
    SidebarInput: (typeof import("./src/components/ui/sidebar/SidebarInput.vue"))["default"]
    SidebarInset: (typeof import("./src/components/ui/sidebar/SidebarInset.vue"))["default"]
    SidebarMenu: (typeof import("./src/components/ui/sidebar/SidebarMenu.vue"))["default"]
    SidebarMenuAction: (typeof import("./src/components/ui/sidebar/SidebarMenuAction.vue"))["default"]
    SidebarMenuBadge: (typeof import("./src/components/ui/sidebar/SidebarMenuBadge.vue"))["default"]
    SidebarMenuButton: (typeof import("./src/components/ui/sidebar/SidebarMenuButton.vue"))["default"]
    SidebarMenuButtonChild: (typeof import("./src/components/ui/sidebar/SidebarMenuButtonChild.vue"))["default"]
    SidebarMenuItem: (typeof import("./src/components/ui/sidebar/SidebarMenuItem.vue"))["default"]
    SidebarMenuSkeleton: (typeof import("./src/components/ui/sidebar/SidebarMenuSkeleton.vue"))["default"]
    SidebarMenuSub: (typeof import("./src/components/ui/sidebar/SidebarMenuSub.vue"))["default"]
    SidebarMenuSubButton: (typeof import("./src/components/ui/sidebar/SidebarMenuSubButton.vue"))["default"]
    SidebarMenuSubItem: (typeof import("./src/components/ui/sidebar/SidebarMenuSubItem.vue"))["default"]
    SidebarProvider: (typeof import("./src/components/ui/sidebar/SidebarProvider.vue"))["default"]
    SidebarRail: (typeof import("./src/components/ui/sidebar/SidebarRail.vue"))["default"]
    SidebarSeparator: (typeof import("./src/components/ui/sidebar/SidebarSeparator.vue"))["default"]
    SidebarTrigger: (typeof import("./src/components/ui/sidebar/SidebarTrigger.vue"))["default"]

    // ===== Separator =====
    Separator: (typeof import("./src/components/ui/separator/Separator.vue"))["default"]

    // ===== Skeleton =====
    Skeleton: (typeof import("./src/components/ui/skeleton/Skeleton.vue"))["default"]

    // ===== Sonner =====
    Sonner: (typeof import("./src/components/ui/sonner/Sonner.vue"))["default"]

    // ===== Stepper =====
    Stepper: (typeof import("./src/components/ui/stepper/Stepper.vue"))["default"]
    StepperItem: (typeof import("./src/components/ui/stepper/StepperItem.vue"))["default"]
    StepperTrigger: (typeof import("./src/components/ui/stepper/StepperTrigger.vue"))["default"]
    StepperTitle: (typeof import("./src/components/ui/stepper/StepperTitle.vue"))["default"]
    StepperDescription: (typeof import("./src/components/ui/stepper/StepperDescription.vue"))["default"]
    StepperIndicator: (typeof import("./src/components/ui/stepper/StepperIndicator.vue"))["default"]
    StepperSeparator: (typeof import("./src/components/ui/stepper/StepperSeparator.vue"))["default"]

    // ===== Collapsible =====
    Collapsible: (typeof import("./src/components/ui/collapsible/Collapsible.vue"))["default"]
    CollapsibleTrigger: (typeof import("./src/components/ui/collapsible/CollapsibleTrigger.vue"))["default"]
    CollapsibleContent: (typeof import("./src/components/ui/collapsible/CollapsibleContent.vue"))["default"]

    // ===== Range Calendar =====
    RangeCalendar: (typeof import("./src/components/ui/range-calendar/RangeCalendar.vue"))["default"]
    RangeCalendarGrid: (typeof import("./src/components/ui/range-calendar/RangeCalendarGrid.vue"))["default"]
    RangeCalendarGridHead: (typeof import("./src/components/ui/range-calendar/RangeCalendarGridHead.vue"))["default"]
    RangeCalendarGridBody: (typeof import("./src/components/ui/range-calendar/RangeCalendarGridBody.vue"))["default"]
    RangeCalendarGridRow: (typeof import("./src/components/ui/range-calendar/RangeCalendarGridRow.vue"))["default"]
    RangeCalendarHeadCell: (typeof import("./src/components/ui/range-calendar/RangeCalendarHeadCell.vue"))["default"]
    RangeCalendarHeader: (typeof import("./src/components/ui/range-calendar/RangeCalendarHeader.vue"))["default"]
    RangeCalendarHeading: (typeof import("./src/components/ui/range-calendar/RangeCalendarHeading.vue"))["default"]
    RangeCalendarCell: (typeof import("./src/components/ui/range-calendar/RangeCalendarCell.vue"))["default"]
    RangeCalendarCellTrigger: (typeof import("./src/components/ui/range-calendar/RangeCalendarCellTrigger.vue"))["default"]
    RangeCalendarNextButton: (typeof import("./src/components/ui/range-calendar/RangeCalendarNextButton.vue"))["default"]
    RangeCalendarPrevButton: (typeof import("./src/components/ui/range-calendar/RangeCalendarPrevButton.vue"))["default"]

    // ===== Form =====
    FormTable: (typeof import("./src/components/form/FormTable.vue"))["default"]
    FormTableHeader: (typeof import("./src/components/form/FormTableHeader.vue"))["default"]
    FormTableAction: (typeof import("./src/components/form/FormTableAction.vue"))["default"]
    FormInput: (typeof import("./src/components/form/FormInput.vue"))["default"]
    FormSelect: (typeof import("./src/components/form/FormSelect.vue"))["default"]
    FormPicker: (typeof import("./src/components/form/FormPicker.vue"))["default"]
  }
}

export {}
