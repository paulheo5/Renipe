﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Renipe.DataContext;

#nullable disable

namespace Renipe.Migrations
{
    [DbContext(typeof(RenipeDBContext))]
    [Migration("20230221201533_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Renipe.Models.Meal", b =>
                {
                    b.Property<int>("MealId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("meal_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MealId"));

                    b.Property<int>("CaloriesPerServing")
                        .HasColumnType("int")
                        .HasColumnName("calories");

                    b.Property<int>("CarbohydratesPerServing")
                        .HasColumnType("int")
                        .HasColumnName("carbohydrates");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2")
                        .HasColumnName("date");

                    b.Property<int>("FatPerServing")
                        .HasColumnType("int")
                        .HasColumnName("fat");

                    b.Property<string>("FoodName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("food_name");

                    b.Property<int>("PhosphorusPerServing")
                        .HasColumnType("int")
                        .HasColumnName("phosphorus");

                    b.Property<int>("PotassiumPerServing")
                        .HasColumnType("int")
                        .HasColumnName("potassium");

                    b.Property<int>("ProteinPerServing")
                        .HasColumnType("int")
                        .HasColumnName("protein");

                    b.Property<string>("ServingSize")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("serving_size");

                    b.Property<string>("ServingSizeUnit")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("serving_size_unit");

                    b.Property<double>("Servings")
                        .HasColumnType("float")
                        .HasColumnName("servings");

                    b.Property<int>("SodiumPerServing")
                        .HasColumnType("int")
                        .HasColumnName("sodium");

                    b.HasKey("MealId");

                    b.ToTable("NutritionData");
                });

            modelBuilder.Entity("Renipe.Models.SavedRecipe", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("RecipeId")
                        .HasColumnType("int");

                    b.Property<string>("SourceUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Recipes");
                });
#pragma warning restore 612, 618
        }
    }
}
